package com.company.todo.management.service;

import com.company.todo.management.dto.JwtAuthResponse;
import com.company.todo.management.dto.LoginDto;
import com.company.todo.management.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
