CREATE TABLE `carrito` (
  `ID_Carrito` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Comprador` varchar(100) DEFAULT NULL,
  `Cant_Items_Total` int(11) NOT NULL DEFAULT 0,
  `Precio_Total` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO electrohouse.carrito
(Nombre_Comprador, Cant_Items_Total, Precio_Total)
VALUES('Tobias', 0, 0),('Santiago', 0, 0);

-- electrohouse.marca definition

CREATE TABLE `marca` (
  `ID_Marca` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO electrohouse.marca
(Nombre)
VALUES('BGH'),('TopHouse'),('Samsung'),('Apple'),('Logitech'),('LG'),('Patrick');


-- electrohouse.categoria definition

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.color definition

CREATE TABLE `color` (
  `ID_Color` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.producto definition

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Imagen` varchar(100) NOT NULL,
  `Descuento` int(11) DEFAULT 0,
  `Precio` float NOT NULL,
  `ID_Marca` int(11) NOT NULL,
  PRIMARY KEY (`ID_Producto`),
  KEY `producto_FK` (`ID_Marca`),
  CONSTRAINT `producto_FK` FOREIGN KEY (`ID_Marca`) REFERENCES `marca` (`ID_Marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO electrohouse.producto
(Nombre, Imagen, Descuento, Precio, ID_Marca)
VALUES('Volante Logitech G29', 'volante.jpg', 0, 40000, 5),
('Heladera Patrick', 'img-heladera-patrick.jpg', 10, 20000, 7),
('Lavarropa Samsung', 'img-lavarropa.jpg', 0, 35000, 3),
('Monitor LG ´34', 'img-monitor-34.jpg', 50, 15000, 6),
('Horno Eléctrico TopHouse', 'img-hornito-electrico.jpg', 15, 12000, 2),
('Apple Homepod', 'homepod.jpg', 15, 30000, 4),
('Aire Acondicionado BGH', 'aire-acondicionado-bgh.jpg', 0, 43000, 1);


-- electrohouse.usuario definition

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Imagen` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contraseña` varchar(500) NOT NULL,
  `ID_Carrito` int(11) NOT NULL,
  PRIMARY KEY (`ID_Usuario`),
  KEY `usuario_FK` (`ID_Carrito`),
  CONSTRAINT `usuario_FK` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO electrohouse.usuario
(Nombre, Imagen, Apellido, Email, Contraseña, ID_Carrito)
VALUES('Tobias', '1638471667281-foto-tobias.jpg', 'Elkowich', 'tobias.elkowich@gmail.com', '$2a$10$LNTC7oPnDFeVjoJDRv.nXO1HxAFFe5PE0En/ET2RULO.23DbJ6tse', 1), ('Santiago', '1638554255545-foto-santiago.jpg', 'Chappa', 'santiago.chappa@gmail.com', '$2a$10$8HX9CowevrZLjsWZ1SsBMObvE8ishkXM58reLni49XnjUO8AH1Cam', 2);

-- electrohouse.categoriaporproducto definition

CREATE TABLE `categoriaporproducto` (
  `ID_CategoriaPorProducto` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Categoria` int(11) NOT NULL,
  PRIMARY KEY (`ID_CategoriaPorProducto`),
  KEY `categoriaPorProducto_FK` (`ID_Producto`),
  KEY `categoriaPorProducto_FK_1` (`ID_Categoria`),
  CONSTRAINT `categoriaPorProducto_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `categoriaPorProducto_FK_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.colorporproducto definition

CREATE TABLE `colorporproducto` (
  `ID_ColorPorProducto` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Color` int(11) NOT NULL,
  PRIMARY KEY (`ID_ColorPorProducto`),
  KEY `colorPorProducto_FK` (`ID_Producto`),
  KEY `colorPorProducto_FK_1` (`ID_Color`),
  CONSTRAINT `colorPorProducto_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `colorPorProducto_FK_1` FOREIGN KEY (`ID_Color`) REFERENCES `color` (`ID_Color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- electrohouse.productoencarrito definition

CREATE TABLE `productoencarrito` (
  `ID_ProductoEnCarrito` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Producto` int(11) NOT NULL,
  `ID_Carrito` int(11) NOT NULL,
  `Cant_Producto` int(11) NOT NULL DEFAULT 0,
  `Precio` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID_ProductoEnCarrito`),
  KEY `productoEnCarrito_FK` (`ID_Producto`),
  KEY `productoEnCarrito_FK_1` (`ID_Carrito`),
  CONSTRAINT `productoEnCarrito_FK` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `productoEnCarrito_FK_1` FOREIGN KEY (`ID_Carrito`) REFERENCES `carrito` (`ID_Carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;