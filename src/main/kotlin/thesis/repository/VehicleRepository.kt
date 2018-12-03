package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import thesis.entities.Vehicle

@Repository
interface VehicleRepository : JpaRepository<Vehicle, Long> {

}
