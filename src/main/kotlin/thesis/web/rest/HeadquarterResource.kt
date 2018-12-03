package thesis.web.rest

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import thesis.constants.Constant
import thesis.entities.Headquarter
import thesis.service.HeadquarterService
import thesis.service.dto.HeadquarterDTO
import java.net.URI
import javax.xml.ws.Response


@RestController
@RequestMapping(Constant.API_BASE_URL)
class HeadquarterResource(val service: HeadquarterService) {

    companion object {
        const val ENTITY_URL: String = "/headquarter"
    }


    @PostMapping(ENTITY_URL)
    fun create(@RequestBody iDTO: HeadquarterDTO) : ResponseEntity<HeadquarterDTO>{
       var headquarterDTO = service.save(iDTO)
        if(headquarterDTO.id == null) {
            return ResponseEntity.badRequest().body(null)
        }

        return ResponseEntity.created(URI(ENTITY_URL + headquarterDTO.id)).header("Headquarter", HttpStatus.OK.toString())
            .body<HeadquarterDTO>(headquarterDTO)
    }

    @PutMapping(ENTITY_URL)
    fun update(@RequestBody iDTO: HeadquarterDTO): ResponseEntity<HeadquarterDTO> {
        return ResponseEntity.ok().body(service.save(iDTO))
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<HeadquarterDTO>> {
        return ResponseEntity.ok(service.getAll()) ;
    }

    @GetMapping(ENTITY_URL + "/{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<HeadquarterDTO> {
        return ResponseEntity.ok(service.getById(id)) ;
    }

    @DeleteMapping( ENTITY_URL + "/{id}")
    fun deleteById(@PathVariable ("id") id: Long) : ResponseEntity<Void> {
        service.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
