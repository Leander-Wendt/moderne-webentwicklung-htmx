package com.bachelorreact.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "794a77424c31646753686d586163414f63322b793646665a62324369356c30626b5734544933696d47373150487a686b4b536833387453485762753967304b507143544937337842502b364363336748724e784c39306e4a634935393755633043416a3641684b6a396762567043795049442b737a33664235415633455a46416e376878634158775775324f37366d4845697772736c55544e5a42654e73776233386a4c574c4b6d67544c4e724e355778585074546b4b686c396276682f754b6e577468624a32305a447075584a7a456f69796a6e4f753138564655547a3956754d475256445a6e794131372b556655774e33593634794b317372527955447730494b67414d52476f385772735939417a34714c316f78684c316e79496c63546f564c6a326c6468385236483330446859784c32386352367370634c6b4a32376f5642423546562b51554f44446b57525171783037656b3639657a4a4f5671556255312f486a4a5a7a456f3da";

    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        final String username = extractUsername(jwt);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
    }

    private boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    private Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.ES256)
                .compact();
    }

    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts.parser().setSigningKey(getSignInKey()).build().parseSignedClaims(jwt).getPayload();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
