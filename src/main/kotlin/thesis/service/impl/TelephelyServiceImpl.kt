package thesis.service.impl

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import thesis.entities.Telephely
import thesis.repository.TelephelyRepository
import thesis.service.TelephelyService
import thesis.service.dto.TelephelyDTO
import thesis.service.mapper.TelephelyMapper

@Service
class TelephelyServiceImpl(val telephelyMapper: TelephelyMapper, val telephelyRepository: TelephelyRepository) : TelephelyService {

    override fun getAll(): List<TelephelyDTO> {
        return telephelyMapper.convertToDtoList(telephelyRepository.findAll())
    }

    override fun getById(id: Long): TelephelyDTO {
        return telephelyMapper.convertToDto(telephelyRepository.getOne(id))
    }

    override fun save(telephelyDTO: TelephelyDTO) : TelephelyDTO {
        var entity: Telephely = telephelyMapper.convertToEntity(telephelyDTO)
        return telephelyMapper.convertToDto(telephelyRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        telephelyRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun query(pageable: Pageable): Page<TelephelyDTO> {
        return telephelyRepository.findAll(pageable).map(telephelyMapper::convertToDto)
    }
}
