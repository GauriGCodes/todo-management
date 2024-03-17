package com.company.todo.management.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Date;

@Component
public class JwtHelperClass {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    // Generate JWT Token
    public String generateJWTToken(Authentication authentication){
        String user = authentication.getName();
        Date currDate = new Date();
        Date expireDate = new Date(currDate.getTime()+jwtExpirationDate);

        return Jwts.builder().setSubject(user).setIssuedAt(new Date()).setExpiration(expireDate).signWith(key()).compact();
    }

    // Validate JWT Token
    public boolean validateToken(String token){
        Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
        return true;
    }

    //Get username from JWT token
    public String getUsername(String token){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }

    //Decode the secret key
    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

}
