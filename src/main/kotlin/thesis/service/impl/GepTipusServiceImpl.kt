package thesis.service.impl

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.repository.GepTipusRepository
import thesis.service.KodtarCrudService
import thesis.service.dto.GepTipusDTO
import thesis.service.mapper.GepTipusMapper

@Transactional
@Service
class GepTipusServiceImpl(val mapper: GepTipusMapper, val gepTipusRepository: GepTipusRepository) : KodtarCrudService<GepTipusDTO> {
    override fun getAll(): List<GepTipusDTO> {
        return gepTipusRepository.findAll().map(mapper::toDto)
    }
}
