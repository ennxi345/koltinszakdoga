package thesis.web.rest

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import thesis.constants.Constant.Companion.API_BASE_URL
import thesis.entities.Vehicle
import thesis.repository.VehicleRepository
import thesis.service.dto.VehicleDTO
import thesis.service.mapper.VehicleMapper
import java.net.URI


@RestController
@RequestMapping(API_BASE_URL)
class VehicleResource (val vehicleRepository: VehicleRepository){

    //A lateinit segítségével tudom autowired-é tenni a mapper-t
    @Autowired
    lateinit var vehicleMapper: VehicleMapper

    @PostMapping("/vehicle")
    fun createVehicleFromDto( @RequestBody vehicleDTO: VehicleDTO): ResponseEntity<VehicleDTO> {

        val headers = HttpHeaders()
        headers.add("X-agroKotlin-error", "error.idexist")
        headers.add("X-agroKotlin-params", "Vehicle")

        if(vehicleDTO.id != null){
            return ResponseEntity.badRequest().body(null)
        }
        var vehicle = vehicleMapper.convertToEntity(vehicleDTO)
        vehicleRepository.save(vehicle)

        return ResponseEntity.created(URI("/api/vehicledto/" + vehicleDTO.id))
            .headers(headers)
            .body<VehicleDTO>(vehicleDTO)
    }

    @GetMapping("/vehicle/all")
    fun getAll(): ResponseEntity<List<VehicleDTO>> {

        val headers = HttpHeaders()
        headers.add("X-agroKotlin-error", "error.idexist")
        headers.add("X-agroKotlin-params", "VehicleList")

        var vehicleList = vehicleRepository.findAll()
        if(vehicleList == null) {
            return  ResponseEntity.badRequest().header(null).body(null)
        }
        return ResponseEntity<List<VehicleDTO>>(vehicleMapper.convertToDtoList(vehicleList), headers, HttpStatus.OK)
    }
}
