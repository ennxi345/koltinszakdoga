package thesis.repository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import thesis.entities.Dolgozo

@Repository
interface DolgozoRepository: JpaRepository<Dolgozo,Long>,JpaSpecificationExecutor<Dolgozo>
