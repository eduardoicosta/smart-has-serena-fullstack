package br.com.smarthas.serena_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "history_records")
@Getter
@Setter
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "history_records_seq_gen")
    @SequenceGenerator(name = "history_records_seq_gen", sequenceName = "history_records_seq", allocationSize = 1)
    private Long id;

    @Column(name = "event_description", nullable = false)
    private String eventDescription;

    @Column(name = "event_timestamp", nullable = false)
    private LocalDateTime eventTimestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}