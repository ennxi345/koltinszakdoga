package thesis.service.impl

import io.github.jhipster.service.QueryService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.entities.*
import thesis.repository.GepRepository
import thesis.service.EntityService
import thesis.service.criteria.GepCriteria
import thesis.service.dto.GepDTO
import thesis.service.mapper.GepMapper

@Service
class GepServiceImpl(val gepRepository: GepRepository, val gepMapper: GepMapper) : EntityService<GepDTO, GepCriteria, Gep>, QueryService<Gep>() {

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
            if (criteria.nev != null) {
                specification = specification.and(buildStringSpecification(criteria.nev, Gep_.nev))
            }
            if (criteria.geptipId != null) {
                specification = specification.and(joinGepTipus(criteria.geptipId!!.equals))
            }
            if (criteria.telephelyId != null) {
                specification = specification.and(joinTelephely(criteria.telephelyId!!.equals))
            }
            if (criteria.markaId != null) {
                specification = specification.and(joinMarka(criteria.markaId!!.equals))
            }
            if (criteria.mukodesKezdeteK != null) {
                specification = specification.and(buildRangeSpecification(criteria.mukodesKezdeteK, Gep_.cegTulajdona))
            }
            if (criteria.mukodesKezdeteV != null) {
                specification = specification.and(buildRangeSpecification(criteria.mukodesKezdeteV, Gep_.cegTulajdona))
            }
        }
        return specification
    }


    fun joinTelephely(input: Long?): Specification<Gep> {
        return Specification<Gep> { root, query, cb ->
            val gepTelephely = root.join<Telephely, Gep>("telephely")
            gepTelephely.on(cb.equal(root.get<Gep>("telephely"), gepTelephely.get<Telephely>("id")))
            cb.equal(gepTelephely.get<Telephely>("id"), input)
        }
    }

    fun joinGepTipus(input: Long?): Specification<Gep> {
        return Specification<Gep> { root, query, cb ->
            val gepGepTipus = root.join<GepTipus, Gep>("gepTipus")
            gepGepTipus.on(cb.equal(root.get<Gep>("gepTipus"), gepGepTipus.get<GepTipus>("id")))
            cb.equal(gepGepTipus.get<GepTipus>("id"), input)
        }
    }

    fun joinMarka(input: Long?): Specification<Gep> {
        return Specification<Gep> { root, query, cb ->
            val gepMarka = root.join<Marka, Gep>("marka")
            gepMarka.on(cb.equal(root.get<Gep>("marka"), gepMarka.get<Marka>("id")))
            cb.equal(gepMarka.get<Telephely>("id"), input)
        }
    }

}
