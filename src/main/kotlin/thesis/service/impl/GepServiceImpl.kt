package thesis.service.impl

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.entities.Gep
import thesis.repository.GepRepository
import thesis.service.EntityService
import thesis.service.criteria.GepCriteria
import thesis.service.dto.GepDTO
import thesis.service.mapper.GepMapper

@Service
class GepServiceImpl(val gepRepository: GepRepository, val gepMapper: GepMapper): EntityService<GepDTO, GepCriteria, Gep> {

    override fun getAll(): List<GepDTO> {
        return gepMapper.toDto(gepRepository.findAll())
    }

    override fun getById(id: Long): GepDTO {
        return gepMapper.toDto(gepRepository.getOne(id))
    }

    @Transactional
    override fun save(dolgozoDTO: GepDTO): GepDTO {
        var entity: Gep = gepMapper.toEntity(dolgozoDTO)
        return gepMapper.toDto(gepRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        gepRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    @Transactional
    override fun query(criteria: GepCriteria, pageable: Pageable): Page<GepDTO> {
        var specification = createSpecification(criteria)
        return gepRepository.findAll(specification, pageable).map(gepMapper::toDto)
    }

    fun createSpecification(criteria: GepCriteria): Specification<Gep> {
        var specification: Specification<Gep> = Specification.where(null)

        if (criteria != null) {
        }
        return specification
    }

}
