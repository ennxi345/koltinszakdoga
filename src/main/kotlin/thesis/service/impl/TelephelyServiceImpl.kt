package thesis.service.impl

import org.springframework.stereotype.Service
import thesis.entities.Telephely
import thesis.repository.HeadquarterRepository
import thesis.service.TelephelyService
import thesis.service.dto.TelephelyDTO
import thesis.service.mapper.TelephelyMapper

@Service
class TelephelyServiceImpl(val telephelyMapper: TelephelyMapper, val headquarterRepository: HeadquarterRepository) : TelephelyService {

    override fun getAll(): List<TelephelyDTO> {
        return telephelyMapper.convertToDtoList(headquarterRepository.findAll())
    }

    override fun getById(id: Long): TelephelyDTO {
        return telephelyMapper.convertToDto(headquarterRepository.getOne(id))
    }

    override fun save(telephelyDTO: TelephelyDTO) : TelephelyDTO {
        var entity: Telephely = telephelyMapper.convertToEntity(telephelyDTO)
        return telephelyMapper.convertToDto(headquarterRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        headquarterRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
