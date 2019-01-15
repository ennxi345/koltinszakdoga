package thesis.service.impl

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.repository.BeosztasRepository
import thesis.service.BeosztasService
import thesis.service.dto.BeosztasDTO
import thesis.service.mapper.BeosztasMapper

@Service
@Transactional
class BeosztasServiceImpl(val beosztasRepository: BeosztasRepository, val beosztasMapper: BeosztasMapper) : BeosztasService{

    @Transactional(readOnly = true)
    override fun getAll(): List<BeosztasDTO> {
        return beosztasMapper.convertToDtoList(beosztasRepository.findAll())
    }
}
