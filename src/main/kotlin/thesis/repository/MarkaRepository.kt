package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Marka

@Repository
interface MarkaRepository : JpaRepository<Marka, Long>
