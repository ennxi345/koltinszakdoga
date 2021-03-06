package thesis.web.rest

import com.codahale.metrics.annotation.Timed

import thesis.domain.User
import thesis.repository.UserRepository
import thesis.security.SecurityUtils
import thesis.service.MailService
import thesis.service.UserService
import thesis.service.dto.UserDTO
import thesis.web.rest.errors.*
import thesis.web.rest.vm.KeyAndPasswordVM
import thesis.web.rest.vm.ManagedUserVM

import org.apache.commons.lang3.StringUtils
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

import javax.servlet.http.HttpServletRequest
import javax.validation.Valid
import thesis.service.dto.PasswordChangeDTO
import java.util.*

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
class AccountResource(private val userRepository: UserRepository,
    private val userService: UserService,
    private val mailService: MailService) {

    private val log = LoggerFactory.getLogger(AccountResource::class.java)

    /**
     * POST  /register : register the user.
     *
     * @param managedUserVM the managed user View Model
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already used
     */
    @PostMapping("/register")
    @Timed
    @ResponseStatus(HttpStatus.CREATED)
    fun registerAccount(@Valid @RequestBody managedUserVM: ManagedUserVM) {
        if (!checkPasswordLength(managedUserVM.password)) {
            throw InvalidPasswordException()
        }
        userRepository.findOneByLogin(managedUserVM.login.toLowerCase()).ifPresent { _ -> throw LoginAlreadyUsedException() }
        userRepository.findOneByEmailIgnoreCase(managedUserVM.email).ifPresent { _ -> throw EmailAlreadyUsedException() }
        val user = userService.registerUser(managedUserVM, managedUserVM.password!!)
        mailService.sendActivationEmail(user)
    }

    /**
     * GET  /activate : activate the registered user.
     *
     * @param key the activation key
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be activated
     */
    @GetMapping("/activate")
    @Timed
    fun activateAccount(@RequestParam(value = "key") key: String) {
        val user = userService.activateRegistration(key)
        if (!user.isPresent) {
            throw InternalServerErrorException("No user was found for this reset key")
        }
    }

    /**
     * GET  /authenticate : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/authenticate")
    @Timed
    fun isAuthenticated(request: HttpServletRequest): String? {
        log.debug("REST request to check if the current user is authenticated")
        return request.remoteUser
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the current user
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    @Timed
    fun getAccount(): UserDTO {
        return userService.getUserWithAuthorities()
            .map { UserDTO(it) }
            .orElseThrow { InternalServerErrorException("User could not be found") }
    }

    /**
     * POST  /account : update the current user information.
     *
     * @param userDTO the current user information
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws RuntimeException 500 (Internal Server Error) if the user login wasn't found
     */
    @PostMapping("/account")
    @Timed
    fun saveAccount(@Valid @RequestBody userDTO: UserDTO) {
        val userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow { InternalServerErrorException("Current user login not found") }
        val existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.email)
        if (existingUser.isPresent && !existingUser.get().login.equals(userLogin, ignoreCase = true)) {
            throw EmailAlreadyUsedException()
        }
        val user = userRepository.findOneByLogin(userLogin)
        if (!user.isPresent) {
            throw InternalServerErrorException("User could not be found")
        }
        userService.updateUser(userDTO.firstName, userDTO.lastName, userDTO.email,
             userDTO.langKey, userDTO.imageUrl)
     }

    /**
     * POST  /account/change-password : changes the current user's password
     *
     * @param passwordChangeDto current and new password
     * @throws InvalidPasswordException 400 (Bad Request) if the new password is incorrect
     */
    @PostMapping(path = arrayOf("/account/change-password"))
    @Timed
     fun changePassword(@RequestBody passwordChangeDto: PasswordChangeDTO) {
        if (!checkPasswordLength(passwordChangeDto.newPassword)) {
            throw InvalidPasswordException()
        }
        userService.changePassword(passwordChangeDto.currentPassword, passwordChangeDto.newPassword)
    }

    /**
     * POST   /account/reset-password/init : Send an email to reset the password of the user
     *
     * @param mail the mail of the user
     * @throws EmailNotFoundException 400 (Bad Request) if the email cim is not registered
     */
    @PostMapping(path = arrayOf("/account/reset-password/init"))
    @Timed
    fun requestPasswordReset(@RequestBody mail: String) {
        mailService.sendPasswordResetMail(
            userService.requestPasswordReset(mail)
                .orElseThrow<EmailNotFoundException>({ EmailNotFoundException() })
        )
    }

    /**
     * POST   /account/reset-password/finish : Finish to reset the password of the user
     *
     * @param keyAndPassword the generated key and the new password
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws RuntimeException 500 (Internal Server Error) if the password could not be reset
     */
    @PostMapping(path = arrayOf("/account/reset-password/finish"))
    @Timed
    fun finishPasswordReset(@RequestBody keyAndPassword: KeyAndPasswordVM) {
        if (!checkPasswordLength(keyAndPassword.newPassword!!)) {
            throw InvalidPasswordException()
        }
        val user = userService.completePasswordReset(keyAndPassword.newPassword!!, keyAndPassword.key!!)

        if (!user.isPresent) {
            throw InternalServerErrorException("No user was found for this reset key")
        }
    }

    private fun checkPasswordLength(password: String?): Boolean {
        return !StringUtils.isEmpty(password) &&
            password!!.length >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length <= ManagedUserVM.PASSWORD_MAX_LENGTH
    }
}
