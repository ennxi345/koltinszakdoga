package thesis.web.rest

import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import thesis.constants.Constant
import thesis.service.TelephelyService
import thesis.service.dto.TelephelyDTO
import java.net.URI
import com.sun.awt.SecurityWarning.getSize
import io.swagger.annotations.ApiParam
import org.springframework.data.domain.Page
import thesis.service.criteria.TelephelyCriteria
import thesis.web.rest.util.PaginationUtil


@RestController
@RequestMapping(Constant.API_BASE_URL)
class TelephelyResource(val service: TelephelyService) {

    companion object {
        const val ENTITY_URL: String = "/telephely"
    }

    @PostMapping(ENTITY_URL)
    fun create(@RequestBody iDTO: TelephelyDTO): ResponseEntity<TelephelyDTO> {
        var telephelyDTO = service.save(iDTO)
        if (telephelyDTO.id == null) {
            return ResponseEntity.badRequest().body(null)
        }

        return ResponseEntity.created(URI(ENTITY_URL + telephelyDTO.id)).header("Telephely", HttpStatus.OK.toString())
            .body<TelephelyDTO>(telephelyDTO)
    }

    @PutMapping(ENTITY_URL)
    fun update(@RequestBody iDTO: TelephelyDTO): ResponseEntity<TelephelyDTO> {
        return ResponseEntity.ok().body(service.save(iDTO))
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<TelephelyDTO>> {
        return ResponseEntity.ok(service.getAll())
    }

    @GetMapping(ENTITY_URL + "/query")
    fun query(@ApiParam telephelyCriteria: TelephelyCriteria, pageable: Pageable): ResponseEntity<List<TelephelyDTO>> {
        var page = service.query(telephelyCriteria, pageable)
        var headers = PaginationUtil.generatePaginationHttpHeaders(page, Constant.API_BASE_URL + ENTITY_URL + "/query")
        return ResponseEntity(page.content, headers, HttpStatus.OK)
    }

/*    @GetMapping(ENTITY_URL + "/all")
    fun getAllTelephely(criteria: TelephelyCriteria): ResponseEntity<List<TelephelyDTO>> {
        return ResponseEntity.ok(service.getAll()) ;
    }*/

    @GetMapping(ENTITY_URL + "/{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<TelephelyDTO> {
        return ResponseEntity.ok(service.getById(id))
    }

    @DeleteMapping(ENTITY_URL + "/{id}")
    fun deleteById(@PathVariable("id") id: Long): ResponseEntity<Void> {
        service.deleteById(id)
        return ResponseEntity.ok().build()


    }


}
