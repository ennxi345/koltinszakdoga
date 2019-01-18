package thesis.web.rest

import io.swagger.annotations.ApiParam
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import thesis.constants.Constant
import thesis.entities.Dolgozo
import thesis.service.CrudService
import thesis.service.criteria.DolgozoCriteria
import thesis.service.dto.DolgozoDTO
import thesis.web.rest.util.PaginationUtil
import java.net.URI

@RestController
@RequestMapping(Constant.API_BASE_URL)
class DolgozoResource(val service: CrudService<DolgozoDTO, DolgozoCriteria, Dolgozo>) {

    companion object {
        const val ENTITY_URL: String = "/dolgozo"
    }

    @PostMapping(ENTITY_URL)
    fun create(@RequestBody iDTO: DolgozoDTO): ResponseEntity<DolgozoDTO> {
        var dolgozoDTO = service.save(iDTO)
        if (dolgozoDTO.id == null) {
            return ResponseEntity.badRequest().body(null)
        }

        return ResponseEntity.created(URI(ENTITY_URL + dolgozoDTO.id)).header("Dolgozo", HttpStatus.OK.toString())
            .body<DolgozoDTO>(dolgozoDTO)
    }

    @PutMapping(ENTITY_URL)
    fun update(@RequestBody iDTO: DolgozoDTO): ResponseEntity<DolgozoDTO> {
        return ResponseEntity.ok().body(service.save(iDTO))
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<DolgozoDTO>> {
        return ResponseEntity.ok(service.getAll())
    }

    @GetMapping(ENTITY_URL + "/query")
    fun query(@ApiParam dolgozoCriteria: DolgozoCriteria, pageable: Pageable): ResponseEntity<List<DolgozoDTO>> {
        var page = service.query(dolgozoCriteria, pageable)
        var headers = PaginationUtil.generatePaginationHttpHeaders(page, Constant.API_BASE_URL + ENTITY_URL + "/query")
        return ResponseEntity(page.content, headers, HttpStatus.OK)
    }

    @GetMapping(ENTITY_URL + "/{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<DolgozoDTO> {
        return ResponseEntity.ok(service.getById(id))
    }

    @DeleteMapping(ENTITY_URL + "/{id}")
    fun deleteById(@PathVariable("id") id: Long): ResponseEntity<Void> {
        service.deleteById(id)
        return ResponseEntity.ok().build()
    }


}
