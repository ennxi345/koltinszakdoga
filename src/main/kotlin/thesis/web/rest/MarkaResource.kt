package thesis.web.rest

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import thesis.constants.Constant
import thesis.service.KodtarCrudService
import thesis.service.dto.MarkaDTO

@RestController
@RequestMapping(Constant.API_BASE_URL)
class MarkaResource(val service: KodtarCrudService<MarkaDTO>) {

    companion object {
        const val ENTITY_URL: String = "/marka"
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<MarkaDTO>> {
        return ResponseEntity.ok(service.getAll());
    }
}
