package com.kh.project.spotflow.repository.TimeLine;

import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TimeLineRepository extends JpaRepository<TimeLine, Long>, TimeLineCustomRepository {
     TimeLine findTimeLineById(Long id);
     List<TimeLine> findByPlace(String place);
     List<TimeLine> findByCustomerOrderByIdDesc(Customer customer);
     List<TimeLine> findByCustomerAndIsDeleteFalseOrderByIdDesc(Customer customer);
}
