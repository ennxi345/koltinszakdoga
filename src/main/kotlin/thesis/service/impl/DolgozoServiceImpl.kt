package thesis.service.impl

import io.github.jhipster.service.QueryService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.entities.Dolgozo
import thesis.entities.Telephely
import thesis.repository.DolgozoRepository
import thesis.service.DolgozoService
import thesis.service.criteria.DolgozoCriteria
import thesis.service.criteria.TelephelyCriteria
import thesis.service.dto.DolgozoDTO
import thesis.service.mapper.DolgozoMapper

@Transactional
@Service
class DolgozoServiceImpl(val dolgozoRepository: DolgozoRepository, val dolgozoMapper: DolgozoMapper) : DolgozoService, QueryService<Dolgozo>() {

    override fun getAll(): List<DolgozoDTO> {
        return dolgozoMapper.convertToDtoList(dolgozoRepository.findAll())
    }

    override fun getById(id: Long): DolgozoDTO {
        return dolgozoMapper.convertToDto(dolgozoRepository.getOne(id))
    }

    @Transactional
    override fun save(dolgozoDTO: DolgozoDTO): DolgozoDTO {
        var entity: Dolgozo = dolgozoMapper.convertToEntity(dolgozoDTO)
        return dolgozoMapper.convertToDto(dolgozoRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        dolgozoRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    @Transactional
    override fun query(criteria: DolgozoCriteria, pageable: Pageable): Page<DolgozoDTO> {
        var specification = createSpecification(criteria)
        return dolgozoRepository.findAll(specification, pageable).map(dolgozoMapper::convertToDto)
    }

    fun createSpecification(criteria: DolgozoCriteria): Specification<Dolgozo> {
        var specification: Specification<Dolgozo> = Specification.where(null)
        return specification
    }
}
