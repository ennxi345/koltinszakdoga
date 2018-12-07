package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Megye

@Repository
interface CountyRepository : JpaRepository<Megye,Long> {

}
