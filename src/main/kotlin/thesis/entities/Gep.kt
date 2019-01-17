package thesis.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "gep")
data class Gep(@Id
               @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
               @SequenceGenerator(name = "sequenceGenerator")
               var id: Long?,
               @Column(name = "vezeteknev", length = 50)
               var vezetekNev: String?,
               @Column(name = "keresztnev", length = 50)
               var keresztkNev: String?,
               @JoinColumn(name = "beosztas_id")
               @ManyToOne(fetch = FetchType.LAZY)
               var beosztas: Beosztas?,
               @JoinColumn(name = "telephely_id")
               @ManyToOne(fetch = FetchType.LAZY)
               var telephely: Telephely?,
               @Column(name = "lakhely", length = 100)
               var lakhely: String?,
               @Column(name = "iranyitoszam")
               var iranyitoSzam: Int?,
               @Column(name = "cim", length = 200)
               var cim: String?,
               @Column(name = "telefonszam", length = 50)
               var telefonSzam: String?,
               @Column(name = "fizetes")
               var fizetes: Long?,
               @Column(name = "szul_ido")
               var szulIdo: LocalDate?,
               @Column(name = "munkaviszony_kezdete")
               var munkaViszonyKezdete: LocalDate?) {
}
