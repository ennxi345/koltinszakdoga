package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Telephely

@Repository
interface TelephelyRepository : JpaRepository<Telephely,Long> {
}
