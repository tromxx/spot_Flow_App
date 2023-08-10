# spotFlow
A social network service that provides real-time event information to each user

# 협업 규칙 
    
### 1. 설정파일을 커밋하지 않는다.  
    1-1. 만일 실수로 커밋할 경우 깃 명령어를 통해 롤백할 것. (롤백 안 되면 도움요청 바람)  
    1-2. 본인이 작업한 파일만 커밋 푸시할 것  
    1-3. build.gradle을 통해 의존성을 추가해야할 경우 README.md에 인수인계할 것
  
### 2. 작업할때 기능단위로 브랜치를 나눠 작업한다.  
    2-1. 커밋과 푸시는 수시로 진행하며 기능구현과 상관없는 페이지는 가능한 건들이지 않는다.  
    2-2. 브랜치 이름은 구현할 기능으로 할 것. (이름으로 지으면 해당 브랜치에서 뭐 했는지 한 눈에 보기 어려움)
  
### 3. 기능구현이 완료되면 풀리퀘스트 요청을 하고 오픈톡방에 인수인계를 남긴다  
    3-1. 마음대로 merge 하지 않는다.  
    3-2. 충돌이 심각해서 병합이 불가능할 경우 본인이 작업한 파일만 백업하고 인수인계를 남긴다. 

### 4. 본인이 작성한 코드에 주석을 주기적으로 작성한다.
    4-1. 최소한 기능(메서드) 단위로라도 해당 코드를 설명하는 주석을 단다.
    4-2. 외부 코드를 접목한 경우 되도록이면 라인마다 주석을 달아서 다른 사람이 보기 편하도록한다.

### 5. 변수명은 직관적으로 짓는다.
    너무 길어져도 상관없으니 해당 변수가 어떤 데이터를 저장하는지 혹은 어떤 기능을 수행하는지  
    알아보기 쉽게 한다.
---
# Example
 ### JWT
    implementation group: 'io.jsonwebtoken', name: 'jjwt-api', version: '0.11.2'  
    runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-impl', version: '0.11.2'
    runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-jackson', version: '0.11.2'
---
# 의존성 추가
### XML to JSON
	implementation group: 'org.json', name: 'json', version: '20210307'
	implementation group: 'commons-io', name: 'commons-io', version: '2.9.0'
    implementation 'org.springframework.boot:spring-boot-starter-mail'

### queryDSL
    1.--- depenencies 에 추가 !!! --- 
    // queryDSL 설정
	implementation "com.querydsl:querydsl-jpa"
	implementation "com.querydsl:querydsl-core"
	implementation "com.querydsl:querydsl-collections"
	annotationProcessor "com.querydsl:querydsl-apt:${dependencyManagement.importedProperties['querydsl.version']}:jpa" // querydsl JPAAnnotationProcessor 사용 지정
	annotationProcessor "jakarta.annotation:jakarta.annotation-api" // java.lang.NoClassDefFoundError (javax.annotation.Generated) 대응 코드
	annotationProcessor "jakarta.persistence:jakarta.persistence-api" // java.lang.NoClassDefFoundError (javax.annotation.Entity) 대응 코드
     --- depenencies 에 추가 끝 !!! --- 

    2.// Querydsl 설정부 코드는 최하단에 추가해주세요 
        def generated = 'src/main/generated'
        
        // querydsl QClass 파일 생성 위치를 지정
        tasks.withType(JavaCompile) {
        options.getGeneratedSourceOutputDirectory().set(file(generated))
        }
        
        // java source set 에 querydsl QClass 위치 추가
        sourceSets {
        main.java.srcDirs += [ generated ]
        }
        
        // gradle clean 시에 QClass 디렉토리 삭제
        clean {
        delete file(generated)
        }

        3.git ignore 에다가 추가해주세요 
        ### Querydsl
        /src/main/generated  

}

