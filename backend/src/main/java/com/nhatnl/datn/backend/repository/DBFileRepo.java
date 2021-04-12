package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileRepo extends JpaRepository<DBFile, Long> {
}
