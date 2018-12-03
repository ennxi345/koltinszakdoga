package thesis.service.impl

import org.springframework.stereotype.Service
import thesis.entities.Headquarter
import thesis.repository.HeadquarterRepository
import thesis.service.HeadquarterService
import thesis.service.dto.HeadquarterDTO
import thesis.service.mapper.HeadquarterMapper

@Service
class HeadquarterServiceImpl(val headquarterMapper: HeadquarterMapper, val headquarterRepository: HeadquarterRepository) : HeadquarterService {

    override fun getAll(): List<HeadquarterDTO> {
        return headquarterMapper.convertToDtoList(headquarterRepository.findAll())
    }

    override fun getById(id: Long): HeadquarterDTO {
        return headquarterMapper.convertToDto(headquarterRepository.getOne(id))
    }

    override fun save(headquarterDTO: HeadquarterDTO) : HeadquarterDTO {
        var entity: Headquarter = headquarterMapper.convertToEntity(headquarterDTO)
        return headquarterMapper.convertToDto(headquarterRepository.save(entity))
    }

    override fun deleteById(id: Long) {
        headquarterRepository.deleteById(id)
    }

    override fun deleteAll() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
