## AstraHACK
![Language](https://img.shields.io/badge/language-JavaScript%20-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Private messenger project for the AstraLinux hackathon.

## Table of Contents
- [Description of features](#description-of-features)
- [Demonstration](#demonstration)
  - [Main page](#main-page)
  - [Registration form](#registration-form)
  - [Chats page](#chats-page)
  - [Video demonstration](#video-demonstration)
- [Installation](#installation)

## Description of features
Adaptability for mobile devices, registration and authorization, file transfer, user search.
Interesting things: beautiful buttons, smart resizing of text fields and moving text between input fields for messages and files, automatic coloring of names.

## Demonstration
#### Main page
<img src="https://private-user-images.githubusercontent.com/97724072/346591882-5ec507e9-7e5f-48ee-aa91-1b08b128ce25.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY1OTE4ODItNWVjNTA3ZTktN2U1Zi00OGVlLWFhOTEtMWIwOGIxMjhjZTI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI3MWYwOWI5ZjNjZjQxOGY2YWMzYjgxOTgzYmJkYjAyYmZmYzNmZjUzMjQyNTAxZTVkNTBlYTg5Y2Y4Yjk0OTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.lF33kDAb_6WhidesrOtk1T3DbBXg_Oe2yRBAZzbKUFc" width="100%" alt="Main page">

Main page mobile adaptation:

<img src="https://private-user-images.githubusercontent.com/97724072/346602130-bea74697-fffc-492a-be4e-6c6b37444cc5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY2MDIxMzAtYmVhNzQ2OTctZmZmYy00OTJhLWJlNGUtNmM2YjM3NDQ0Y2M1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTViYmQwNGExNTRjZmYzMjYwZDIyMDk4MTk3YzY1OTUzYTRhZGU4NjQ2NzFlNWMyODE0MGNlMTNlZWYxZDIwNjUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.q1BELpXRVLvgJ8pbsDw8gJjwhgrlG9qUGmN0VeOp3lw" width="100%" alt="Mobile main page">

##### Registration form
![Registration form](https://private-user-images.githubusercontent.com/97724072/346593020-d8a1cb70-4a4e-45a7-a804-58c8723d312c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY1OTMwMjAtZDhhMWNiNzAtNGE0ZS00NWE3LWE4MDQtNThjODcyM2QzMTJjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWRkMTU5OGZiOTQwNTY0ZDA4OGQ2NzdlZTVmMmYwMzc2MjlkZWM1MDIzYTUxZGViYmIyMjI5MjMwMWVmYmIyOGUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Mfd8muTIRRzTvrw3YGK-aShvSFEFN7CniJMlYsvsmSE)

#### Chats page
<img src="https://private-user-images.githubusercontent.com/97724072/346595540-b91e3d51-dad6-414a-a2f3-52b391a9aec8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY1OTU1NDAtYjkxZTNkNTEtZGFkNi00MTRhLWEyZjMtNTJiMzkxYTlhZWM4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg1ZGUxY2JkODc4ZGRjMGFiM2NjMGMzYTFmNmZiYzFlMjhiZmI4ODk0NTc5NDc2OWYzYTJiYjFiM2Q1ZTYwNDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.f83hWqeDY6zAEAU2YlkQ-QjTFV5z6CwKvYxrZf-ryOY" width="100%" alt="Chats page">

Chats page mibile adaaptation:

<img src="https://private-user-images.githubusercontent.com/97724072/346596235-595bde90-aefc-4880-ad5a-7add0fcf7c7d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY1OTYyMzUtNTk1YmRlOTAtYWVmYy00ODgwLWFkNWEtN2FkZDBmY2Y3YzdkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA3NmJmYmQ4YWNjMjA1OTE5N2NmNmUyZGVjZmM0N2U3MmI4ODQ2ZWIyZGRkNGRkMjUzMjUxMGYzNTBlMWFkMGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.CpLSBCiGhnBflOQaYscrZq2LtS9DI-j2s_mdVA3rqbc" width="100%" alt="Mobile chats page">
<img src="https://private-user-images.githubusercontent.com/97724072/346596229-2860340a-c64c-4089-ade8-8e508197de79.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjA0NTAyODcsIm5iZiI6MTcyMDQ0OTk4NywicGF0aCI6Ii85NzcyNDA3Mi8zNDY1OTYyMjktMjg2MDM0MGEtYzY0Yy00MDg5LWFkZTgtOGU1MDgxOTdkZTc5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA4VDE0NDYyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ1ZWY1Yjk4OTlhNDhjOGI1MWYyNTAzMjNjMGYwYzEwY2I0NjVlMzMwZTFjYWU2Y2NmZDI4M2JkYWQyZGRkOGMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.n-UjvisUr15P7FoYthbtJpuEzdu1hk6bOBIGTX7yoQo" width="100%" alt="Mobile chat">

#### Video demonstration (click to view)
[<img src="https://img.youtube.com/vi/7pEtsMAfOIM/maxresdefault.jpg" width="100%">](https://youtu.be/7pEtsMAfOIM)

## Installation
[Instruction](front/README.md)
