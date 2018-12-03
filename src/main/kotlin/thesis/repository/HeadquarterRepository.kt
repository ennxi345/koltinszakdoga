package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Headquarter

@Repository
interface HeadquarterRepository : JpaRepository<Headquarter,Long> {
}
