package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.common.ibs_common.model.ibs.Application;
import com.ibs.common.ibs_common.repository.ibs.ApplicationRepository;
import com.ibs.common.ibs_common.service.TokenService;
import com.ibs.common.ibs_common.utilitaire.FonctionUtil;


@RestController
public class PersonneController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private FonctionUtil fonctionUtil;

    @Autowired
    private ApplicationRepository appliRepo;

    /** méthode pour se déconnecter
     * @return
     */
    @GetMapping("logout")
    public ResponseEntity logout(@RequestHeader(value = "Authorization", required = true)String authorizationHeader, @RequestHeader(value = "User-Agent", required = true)String idappareil) {
        String token = FonctionUtil.getBearerToken(authorizationHeader);
        tokenService.deleteToken(token, idappareil);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("liste-application")
    public ResponseEntity<List<Application>> listerApplication() {
        List<Application> applications = appliRepo.findAll();
        return ResponseEntity.ok(applications);
    }

}
