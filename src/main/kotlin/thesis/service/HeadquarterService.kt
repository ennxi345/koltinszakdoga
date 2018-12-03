package thesis.service

import org.springframework.stereotype.Service
import thesis.service.dto.HeadquarterDTO

interface HeadquarterService {

    fun getAll() : List<HeadquarterDTO>

    fun getById(id: Long) : HeadquarterDTO

    fun save(headquarterDTO: HeadquarterDTO) : HeadquarterDTO

    fun deleteById(id: Long)

    fun deleteAll()
}
