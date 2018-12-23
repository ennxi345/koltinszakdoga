package thesis.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import thesis.service.criteria.TelephelyCriteria
import thesis.service.dto.TelephelyDTO

interface TelephelyService {

    fun getAll() : List<TelephelyDTO>

    fun query(telephelyCriteria: TelephelyCriteria, pageable: Pageable) : Page<TelephelyDTO>

    fun getById(id: Long) : TelephelyDTO

    fun save(telephelyDTO: TelephelyDTO) : TelephelyDTO

    fun deleteById(id: Long)

    fun deleteAll()
}
