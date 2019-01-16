package thesis.service.impl

import io.github.jhipster.service.QueryService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.entities.Beosztas
import thesis.entities.Dolgozo
import thesis.entities.Dolgozo_
import thesis.entities.Telephely
import thesis.repository.DolgozoRepository
import thesis.service.DolgozoService
import thesis.service.criteria.DolgozoCriteria
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

        if (criteria != null) {
            if (criteria.vezetekNev != null) {
                specification = specification.and(buildStringSpecification(criteria.vezetekNev, Dolgozo_.vezetekNev))
            }
            if (criteria.keresztNev != null) {
                specification = specification.and(buildStringSpecification(criteria.keresztNev, Dolgozo_.keresztkNev))
            }
            if (criteria.beosztasId != null) {
                specification = specification.and(joinBeosztas(criteria.beosztasId!!.equals))
            }
            if (criteria.telephelyId != null) {
                specification = specification.and(joinTelephely(criteria.telephelyId!!.equals))
            }
            if (criteria.munkaViszonyKezdeteK != null) {
                specification = specification.and(buildRangeSpecification(criteria.munkaViszonyKezdeteK, Dolgozo_.munkaViszonyKezdete))
            }
            if (criteria.munkaViszonyKezdeteV != null) {
                specification = specification.and(buildRangeSpecification(criteria.munkaViszonyKezdeteV, Dolgozo_.munkaViszonyKezdete))
            }
        }
        return specification
    }

    fun joinBeosztas(input: Long?): Specification<Dolgozo> {
        return Specification<Dolgozo> { root, query, cb ->
            val dolgozoBeosztas = root.join<Beosztas, Dolgozo>("beosztas")
            dolgozoBeosztas.on(cb.equal(root.get<Dolgozo>("beosztas"), dolgozoBeosztas.get<Beosztas>("id")))
            cb.equal(dolgozoBeosztas.get<Beosztas>("id"), input)
        }
    }

    fun joinTelephely(input: Long?): Specification<Dolgozo> {
        return Specification<Dolgozo> { root, query, cb ->
            val dolgozoTelephely = root.join<Telephely, Dolgozo>("telephely")
            dolgozoTelephely.on(cb.equal(root.get<Dolgozo>("telephely"), dolgozoTelephely.get<Telephely>("id")))
            cb.equal(dolgozoTelephely.get<Telephely>("id"), input)
        }
    }
}
