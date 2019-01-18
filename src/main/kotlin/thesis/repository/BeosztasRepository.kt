package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Beosztas

@Repository
interface BeosztasRepository : JpaRepository<Beosztas, Long>
