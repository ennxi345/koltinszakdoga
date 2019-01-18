package thesis.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import thesis.service.criteria.DolgozoCriteria
import thesis.service.dto.DolgozoDTO

interface GepService {

    fun getAll() : List<DolgozoDTO>

    fun query(telephelyCriteria: DolgozoCriteria, pageable: Pageable) : Page<DolgozoDTO>

    fun getById(id: Long) : DolgozoDTO

    fun save(telephelyDTO: DolgozoDTO) : DolgozoDTO

    fun deleteById(id: Long)

    fun deleteAll()
}
