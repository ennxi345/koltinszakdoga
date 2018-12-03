package thesis.web.rest

import thesis.security.jwt.JWTConfigurer
import thesis.security.jwt.TokenProvider
import thesis.web.rest.vm.LoginVM

import com.codahale.metrics.annotation.Timed
import com.fasterxml.jackson.annotation.JsonProperty

import org.springframework.http.HttpStatus
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

import javax.validation.Valid

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
class UserJWTController (private val tokenProvider: TokenProvider, private val authenticationManager: AuthenticationManager) {

    @PostMapping("/authenticate")
    @Timed
    fun authorize(@Valid @RequestBody loginVM: LoginVM): ResponseEntity<JWTToken>? {

        val authenticationToken = UsernamePasswordAuthenticationToken(loginVM.username, loginVM.password)

        val authentication = authenticationManager.authenticate(authenticationToken)
        SecurityContextHolder.getContext().authentication = authentication
        val rememberMe = if (loginVM.isRememberMe == null) false else loginVM.isRememberMe
        val jwt = tokenProvider.createToken(authentication, rememberMe)
        val httpHeaders = HttpHeaders()
        httpHeaders.add(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt)
        return ResponseEntity(JWTToken(jwt), httpHeaders, HttpStatus.OK)
    }
}

/**
 * Object to return as body in JWT Authentication.
 */
data class JWTToken(@JsonProperty("id_token") val idToken: String)
