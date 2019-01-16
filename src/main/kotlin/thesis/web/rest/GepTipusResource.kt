package thesis.web.rest

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import thesis.constants.Constant
import thesis.service.GepTipusService
import thesis.service.dto.GepTipusDTO

@RestController
@RequestMapping(Constant.API_BASE_URL)
class GepTipusResource(val gepTipusService: GepTipusService) {

    companion object {
        const val ENTITY_URL: String = "/geptip"
    }

    @GetMapping(ENTITY_URL + "/all")
    fun getAll(): ResponseEntity<List<GepTipusDTO>> {
        return ResponseEntity.ok(gepTipusService.getAll());
    }
}
