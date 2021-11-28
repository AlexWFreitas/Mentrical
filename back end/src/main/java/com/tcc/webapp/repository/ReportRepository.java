package com.tcc.webapp.repository;

import com.tcc.webapp.model.report.Report;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
	
}
