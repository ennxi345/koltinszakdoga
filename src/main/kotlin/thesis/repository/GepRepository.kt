package thesis.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import thesis.entities.Gep

@Repository
interface GepRepository: JpaRepository<Gep,Long>, JpaSpecificationExecutor<Gep>
