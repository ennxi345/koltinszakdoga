package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.County

@Repository
interface CountyRepository : JpaRepository<County,Long> {

}
