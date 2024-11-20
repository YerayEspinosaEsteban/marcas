
Algoritmo Irrigadores_Binarios
    
    Definir Hora, Minuto, Segundo Como Entero
    Definir Hora_Actual, Minuto_Actual, Segundo_Actual Como Entero
    Definir Riega_dos_horas Como Cadena
    
    Escribir "Ingrese la hora (en formato 24 horas) a la que desea activar el riego: "
    Leer Hora
    Escribir "Ingrese el minuto a la que desea activar el riego: "
    Leer Minuto
    Escribir "Ingrese el segundo a la que desea activar el riego: "
    Leer Segundo
    Escribir "Ingrese la hora actual (en formato 24 horas): "
    Leer Hora_Actual
    Escribir "Ingrese el minuto actual: "
    Leer Minuto_Actual
    Escribir "Ingrese el segundo actual: "
    Leer Segundo_Actual
    
    Mientras Verdadero Hacer
        Si Hora_Actual = Hora Y Minuto_Actual = Minuto Y Segundo_Actual = Segundo Entonces
            Riega_dos_horas = "1111 1111"  
            Escribir "Regando durante 2 horas a la hora programada: ", Riega_dos_horas
        FinSi
    Fin Mientras
FinAlgoritmo