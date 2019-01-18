package thesis.web.rest

import io.swagger.annotations.ApiParam
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import thesis.constants.Constant
import thesis.entities.Gep
import thesis.service.EntityService
import thesis.service.criteria.GepCriteria
import thesis.service.dto.GepDTO
import thesis.web.rest.util.PaginationUtil
import java.net.URI

@RestController
class GepResource(val service: EntityService<GepDTO, GepCriteria, Gep>) {

    companion object {
        const val ENTITY_URL: String = "/gep"
    }

    @PostMapping(ENTITY_URL)
    fun create(@RequestBody iDTO: GepDTO): ResponseEntity<GepDTO> {
        var gepDTO = service.save(iDTO)
        if (gepDTO.id == null) {
            return ResponseEntity.badRequest().body(null)
        }

        return ResponseEntity.created(URI(ENTITY_URL + gepDTO.id)).header("Dolgozo", HttpStatus.OK.toString())
            .body<GepDTO>(gepDTO)
    }

    @PutMapping(ENTITY_URL)
    fun update(@RequestBody iDTO: GepDTO): ResponseEntity<GepDTO> {
        return ResponseEntity.ok().body(service.save(iDTO))
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<GepDTO>> {
        return ResponseEntity.ok(service.getAll())
    }

    @GetMapping(ENTITY_URL + "/query")
    fun query(@ApiParam gepCriteria: GepCriteria, pageable: Pageable): ResponseEntity<List<GepDTO>> {
        var page = service.query(gepCriteria, pageable)
        var headers = PaginationUtil.generatePaginationHttpHeaders(page, Constant.API_BASE_URL + ENTITY_URL + "/query")
        return ResponseEntity(page.content, headers, HttpStatus.OK)
    }

    @GetMapping(ENTITY_URL + "/{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<GepDTO> {
        return ResponseEntity.ok(service.getById(id))
    }

    @DeleteMapping(ENTITY_URL + "/{id}")
    fun deleteById(@PathVariable("id") id: Long): ResponseEntity<Void> {
        service.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
