### 1. Consultas sobre una tabla

1. Devuelve un listado con todos los pedidos que se han realizado. Los pedidos deben estar ordenados por la fecha de realización, mostrando en primer lugar los pedidos más recientes.

   ```sql
   select * from pedido order by fecha desc;
   ```

2. Devuelve todos los datos de los dos pedidos de mayor valor.

   ```sql
   select * from pedido order by total desc limit 2;
   ```

3. Devuelve un listado con los identificadores de los clientes que han realizado algún pedido. Tenga en cuenta que no debe mostrar identificadores que estén repetidos.

   ```sql
   select distinct id_cliente from pedido;
   ```

4. Devuelve un listado de todos los pedidos que se realizaron durante el año 2017, cuya cantidad total sea superior a 500€.

   ```sql
   select * from pedido where year(fecha) = 2017 and total > 500;
   ```

5. Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisión entre 0.05 y 0.11.

   ```sql
   select nombre, apellido1, apellido2 from comercial where comision > 0.05 and comision < 0.11;
   ```

6. Devuelve el valor de la comisión de mayor valor que existe en la tabla `comercial`.

   ```sql
   select comision from comercial order by comision desc limit 1;
   ```

7. Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido **no** es `NULL`. El listado deberá estar ordenado alfabéticamente por apellidos y nombre.

   ```sql
   select id, concat(nombre, ' ', apellido1) as nombre_completo from cliente where apellido2 is not null order by nombre asc, apellido1 asc, apellido2 asc;
   ```

8. Devuelve un listado de los nombres de los clientes que empiezan por `A` y terminan por `n` y también los nombres que empiezan por `P`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   select nombre from cliente where nombre like '%n' and nombre like 'a%' or nombre like 'p%' order by nombre asc;
   ```

9. Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberá estar ordenado alfabéticamente.

   ```sql
   SELECT nombre
   FROM cliente
   WHERE nombre NOT LIKE 'A%'
   ORDER BY nombre;
   ```

10. Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberán eliminar los nombres repetidos.

    ```sql
    SELECT DISTINCT nombre
    FROM comercial
    WHERE LOWER(RIGHT(nombre, 2)) = 'el' OR LOWER(RIGHT(nombre, 1)) = 'o';
    ```

### 2. Consultas multitabla (Composición interna)

Resuelva todas las consultas utilizando la sintaxis de `SQL1` y `SQL2`.

1. Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algún pedido. El listado debe estar ordenado alfabéticamente y se deben eliminar los elementos repetidos.

   ```sql
   select distinct c.id, c.nombre, c.apellido1, c.apellido2 from cliente c inner join pedido p on p.id_cliente = c.id
   ```

2. Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. El listado debe mostrar los datos de los clientes ordenados alfabéticamente.

   ```sql
    select  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial 
       from cliente c
       inner join pedido p on c.id = p.id_cliente
       order by c.nombre asc, c.apellido1 asc;
   ```

3. Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. El listado debe mostrar los datos de los comerciales ordenados alfabéticamente.

   ```sql
   SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p INNER JOIN comercial AS cl ON cl.id = p.id_comercial ORDER BY nombre;
   ```

4. Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

   ```sql
   SELECT c.id AS cliente_id, p.id AS pedido_id, co.id AS comercial_id, co.nombre, co.apellido1 FROM cliente AS c INNER JOIN pedido AS p ON c.id = p.id_cliente INNER JOIN comercial AS co ON p.id_comercial = co.id ORDER BY c.id;
   ```

5. Devuelve un listado de todos los clientes que realizaron un pedido durante el año `2017`, cuya cantidad esté entre `300` € y `1000` €.

   ```sql
   SELECT DISTINCT cliente.nombre, cliente.apellido1, cliente.apellido2 FROM cliente JOIN pedido ON cliente.id = pedido.id_cliente WHERE YEAR(pedido.fecha) = 2017   AND pedido.total BETWEEN 300 AND 1000;
   ```

6. Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algún pedido realizado por `María Santana Moreno`.

   ```sql
      SELECT co.apellido1, co.nombre, co.apellido2
      FROM comercial co
      INNER JOIN pedido p ON p.id_comercial = co.id
      INNER JOIN cliente cl ON cl.id = p.id_cliente
      WHERE
      concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno';
   ```

7. Devuelve el nombre de todos los clientes que han realizado algún pedido con el comercial `Daniel Sáez Vega`.

   ```sql
   select distinct c.nombre from cliente c inner join pedido p on p.id_cliente = c.id where p.id_comercial = (select id from comercial where concat(nombre, ' ', apellido1, ' ', apellido2) = 'Daniel Sáez Vega');
   ```

### 3. Consultas multitabla (Composición externa)

Resuelva todas las consultas utilizando las cláusulas `LEFT JOIN` y `RIGHT JOIN`.

1. Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los clientes que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los clientes.

   ```sql
   select distinct c.id, c.nombre, c.apellido1, c.apellido2, p.* from cliente c left join pedido p on c.id = p.id_cliente;
   ```

2. Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los comerciales que no han realizado ningún pedido. El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los comerciales.

   ```sql
   SELECT co.id, concat(co.apellido1, " " ,co.apellido2, " ", co.nombre) as namefull, pe.total, pe.fecha, pe.id_cliente 
   FROM comercial co
   left JOIN pedido pe ON pe.id_comercial = co.id 
   ORDER BY namefull LIKE 'A%' ASC , namefull;
   ```

3. Devuelve un listado que solamente muestre los clientes que no han realizado ningún pedido.

   ```sql
   select c.* from cliente c left join pedido p on c.id = p.id_cliente where p.id_cliente is null;
   ```

4. Devuelve un listado que solamente muestre los comerciales que no han realizado ningún pedido.

   ```sql
   SELECT DISTINCT c.id,c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM comercial AS c LEFT JOIN pedido AS p ON c.id=p.id_comercial WHERE p.id_comercial IS NULL GROUP BY c.id;
   ```

5. Devuelve un listado con los clientes que no han realizado ningún pedido y de los comerciales que no han participado en ningún pedido. Ordene el listado alfabéticamente por los apellidos y el nombre. En en listado deberá diferenciar de algún modo los clientes y los comerciales.

   ```sql
   # German
   ```

   

### 4. Consultas resumen

1. Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   select sum(total) as Total from pedido;
   
   ```

2. Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`.

   ```sql
   select avg(total) as promedio from pedido;
   ```

3. Calcula el número total de comerciales distintos que aparecen en la tabla `pedido`.

   ```sql
   SELECT COUNT(DISTINCT id_comercial) AS 'total_comerciales' FROM pedido;
   ```

4. Calcula el número total de clientes que aparecen en la tabla `cliente`.

   ```sql
   select count(*) from cliente;
   ```

5. Calcula cuál es la mayor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MAX(total) FROM pedido;
   ```

6. Calcula cuál es la menor cantidad que aparece en la tabla `pedido`.

   ```sql
   SELECT MIN(total) FROM pedido;
   ```

7. Calcula cuál es el valor máximo de categoría para cada una de las ciudades que aparece en la tabla `cliente`.

   ```sql
   select distinct(ciudad), max(categoria) from cliente group by ciudad;
   ```

8. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes. Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo día. Se pide que se calcule cuál es el pedido de máximo valor para cada uno de los días en los que un cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

   ```SQL
   SELECT t1.id, t1.nombre, t1.apellido1, MAX(t2.total),     t2.fecha 
   
   FROM cliente t1, pedido t2 
   
   WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id ORDER BY t2.fecha;
   ```

9. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes, teniendo en cuenta que sólo queremos mostrar aquellos pedidos que superen la cantidad de 2000 €.

   ```sql
      SELECT p.*
      FROM pedido p
      INNER JOIN (
          SELECT id_cliente, fecha, MAX(total) AS max_total
          FROM pedido
          WHERE total > 2000
          GROUP BY id_cliente, fecha
      ) po ON p.id_cliente = po.id_cliente AND p.fecha = po.fecha AND p.total = po.max_total;
      
   ```

10. Calcula el máximo valor de los pedidos realizados para cada uno de los comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total.

    ```sql
    SELECT p.id 'id_pedido'
    , c.id 'id_comercial', concat(c.nombre ,'  ', c.apellido1) 'Comercial', max(p.total) 'Max Value' From comercial  c INNER JOIN pedido p ON c.id= p.id_comercial WHERE fecha='2016-08-17' GROUP BY p.id , c.nombre , c.apellido1;
    ```

11. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes. Tenga en cuenta que pueden existir clientes que no han realizado ningún pedido. Estos clientes también deben aparecer en el listado indicando que el número de pedidos realizados es `0`.

    ```sql
    SELECT cliente.id, cliente.apellido1, cliente.apellido2, COUNT(pedido.id)
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id;
    ```

12. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes **durante el año 2017**.

    ```sql
    select cliente.id, cliente.nombre, cliente.apellido1, cliente.apellido2, count(pedido.id) as cantidad2017 from cliente inner join pedido on pedido.id_cliente = cliente.id where year(pedido.fecha) = 2017 group by cliente.id;
    ```

13. Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la máxima cantidad del pedido realizado por cada uno de los clientes. El resultado debe mostrar aquellos clientes que no han realizado ningún pedido indicando que la máxima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la función [`IFNULL`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_ifnull).

    ```sql
    SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id;
    ```

14. Devuelve cuál ha sido el pedido de máximo valor que se ha realizado cada año.

    ```sql
        SELECT 
        pedidos.id,
        YEAR(pedidos.fecha) AS Año,
        pedidos.total AS 'Maximo Valor',
        pedidos.fecha AS 'Fecha Completa',
        pedidos.id_cliente AS 'ID Cliente',
        pedidos.id_comercial AS 'ID Comercial'
        FROM 
        pedido pedidos JOIN (
          SELECT
          YEAR(fecha) AS Año,
          max(total) AS Valor_Maximo
          FROM 
          pedido
          GROUP BY 
          año 
          ORDER BY 
          año) 
       AS max_ped_por_año 
       ON Año = max_ped_por_año.Año 
       AND pedidos.total = max_ped_por_año.Valor_Maximo;
    ```

15. Devuelve el número total de pedidos que se han realizado cada año.

    ```sql
    SELECT YEAR(fecha) AS año, COUNT(*) AS numero_pedido FROM pedido GROUP BY YEAR(fecha) ORDER BY año;
    ```

#### 5. Subconsultas con `IN` y `NOT IN`

1. Devuelve un listado de los clientes que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

   ```sql
   select * from cliente where cliente.id not in (select id_cliente from pedido);
   ```

2. Devuelve un listado de los comerciales que no han realizado ningún pedido. (Utilizando `IN` o `NOT IN`).

   ```sql
   select * from comercial where comercial.id not in (select id_comercial from pedido);
   ```

   