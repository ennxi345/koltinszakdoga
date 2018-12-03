package thesis.web.rest

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import thesis.constants.Constant
import thesis.service.CountyService
import thesis.service.dto.CountyDTO

@RestController
@RequestMapping(Constant.API_BASE_URL)
class CountyResource(val countyService: CountyService) {


    companion object {
        const val ENTITY_URL: String = "/county"
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<CountyDTO>> {
        return ResponseEntity.ok(countyService.getAll()) ;
    }
}
