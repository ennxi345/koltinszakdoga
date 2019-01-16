package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import thesis.entities.GepTipus

interface GepTipusRepository: JpaRepository<GepTipus,Long>
