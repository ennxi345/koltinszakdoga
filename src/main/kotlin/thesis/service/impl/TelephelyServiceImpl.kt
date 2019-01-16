package thesis.service.impl

import io.github.jhipster.service.QueryService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.entities.Megye
import thesis.entities.Telephely
import thesis.entities.Telephely_
import thesis.repository.TelephelyRepository
import thesis.service.TelephelyService
import thesis.service.criteria.TelephelyCriteria
import thesis.service.dto.TelephelyDTO
import thesis.service.mapper.TelephelyMapper

@Transactional
@Service
class TelephelyServiceImpl(val telephelyMapper: TelephelyMapper, val telephelyRepository: TelephelyRepository) : TelephelyService, QueryService<Telephely>() {

    override fun getAll(): List<TelephelyDTO> {
        return telephelyMapper.convertToDtoList(telephelyRepository.findAll())
    }

    override fun getById(id: Long): TelephelyDTO {
        return telephelyMapper.convertToDto(telephelyRepository.getOne(id))
    }

    @Transactional
    override fun save(telephelyDTO: TelephelyDTO): TelephelyDTO {
        var entity: Telephely = telephelyMapper.convertToEntity(telephelyDTO)
        return telephelyMapper.convertToDto(telephelyRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        telephelyRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    @Transactional
    override fun query(criteria: TelephelyCriteria, pageable: Pageable): Page<TelephelyDTO> {
        var specification = createSpecification(criteria)
        return telephelyRepository.findAll(specification, pageable).map(telephelyMapper::convertToDto)
    }

    fun createSpecification(criteria: TelephelyCriteria): Specification<Telephely> {
        var specification: Specification<Telephely> = Specification.where(null)

        if (criteria != null) {
            if (criteria.nev != null) {
                specification = specification.and(buildStringSpecification(criteria.nev, Telephely_.nev))
            }
            if (criteria.telepules != null) {
                specification = specification.and(buildStringSpecification(criteria.telepules, Telephely_.telepules))
            }
            if (criteria.megyeId != null) {
                specification = specification.and(joinMegye(criteria.megyeId!!.equals))
            }
            if (criteria.cim != null) {
                specification = specification.and(buildStringSpecification(criteria.cim, Telephely_.cim))
            }
            if (criteria.mukodesKezdeteK != null) {
                specification = specification.and(buildRangeSpecification(criteria.mukodesKezdeteK, Telephely_.mukodesKezdete))
            }
            if (criteria.mukodesKezdeteV != null) {
                specification = specification.and(buildRangeSpecification(criteria.mukodesKezdeteV, Telephely_.mukodesKezdete))
            }
        }
        return specification
    }

    fun joinMegye(input: Long?): Specification<Telephely> {
        return Specification<Telephely> { root, query, cb ->
            val telephelyMegye = root.join<Megye, Telephely>("megye")
            telephelyMegye.on(cb.equal(root.get<Telephely>("megye"), telephelyMegye.get<Megye>("id")))
            cb.equal(telephelyMegye.get<Megye>("id"), input)
        }
    }
}
