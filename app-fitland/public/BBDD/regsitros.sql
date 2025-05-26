TRUNCATE TABLE
  usuarios,
  inscripciones,
  planes_suscripcion,
  productos,
  clases,
  suscripciones,
  compras,
  detalle_compras,
  pagos
RESTART IDENTITY
CASCADE;

INSERT INTO public.usuarios VALUES (1, 'Brandon Muzo', '59876789K', 'Calle Libertad 21', 'cuentawamp@gmail.com', '$2y$12$hbAq9gmd4EsYvOOl6DSp9eoFwKlaaJCsPsWXW5hgMjdbaGoJlNzwm', '/images/defaults/avatar.jpg', 'admin', '2025-04-21 00:11:31', 'MXOSrZG3ib6f9EEeO2T3jJ3SwkT4lnYetsfijB9AWH32TXg9MB2BBbLGb5an');
INSERT INTO public.usuarios VALUES (2, 'Alejandro Prado Flórez', '47544281S', 'Calle Montecarlo 7', 'alejandroprado04@gmail.com', '$2y$12$O.nweQ5STbfeIIq4QVxpsOuQ3MeHIyKxO/N7zCdQt1FN50j5Aj.rO', '/images/defaults/avatar.jpg', 'admin', NULL, NULL);
INSERT INTO public.usuarios VALUES (3, 'Adelaida Paniagua Armengol', '83057326W', 'Cañada de Lucía González 59, Badajoz, 75625', 'ccolomer@hotmail.com', '56aef6f6111ea6e995b73183ae42d09e8ddcc0a747fd1e9af230896f60e6b27f', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:49:36', 'c20b8b6e3cda2c14871c68565588e38144876477');
INSERT INTO public.usuarios VALUES (4, 'Josefina Chaparro Martínez', '55085956J', 'Glorieta de Albina Torrijos 157 Piso 4 , Valencia, 09305', 'hagustin@gmail.com', '6cdb29ef0954a881edc7d2020c5a54862397d828d82f253453da57318d14aa1b', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:49:44', '6042dd864fe0570a0263b8bfebfd9fc6b5bf4442');
INSERT INTO public.usuarios VALUES (5, 'Juanito Francisco Carrasco Ibañez', '71465572H', 'Cañada de Lorenzo Vizcaíno 99, Murcia, 68644', 'clementina22@gmail.com', 'bd0a8743578c919a16cae714e2aa8615ce0606261cbb35fe71d73a1e0347aa27', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:50:18', 'a67c50d8cc28724a5eca3a226b6b4da5a7309222');
INSERT INTO public.usuarios VALUES (6, 'Rodrigo Mascaró Costa', '30590713T', 'Cuesta Martirio Guerra 164 Apt. 40 , Córdoba, 89671', 'loreto39@gmail.com', '7b4470efd5faf67843c7f5a0988afbb020ecf50c89c1e9f1b97c71e93065b8a6', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:50:25', 'dc4e18ad712a4e1493c49ad3c9101e91a82395d6');
INSERT INTO public.usuarios VALUES (7, 'hsidhis', 'X4527788K', 'Calle Real', 'hola@gmail.com', '$2y$12$fmNHWF46qL1Av00pWllBMOGMRMQqwBJVnUBiYBQE11giv54Ln4pcG', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:50:31', NULL);
INSERT INTO public.usuarios VALUES (8, 'Leocadia Ríos Asenjo', '58211168P', 'Pasaje de Desiderio Boada 4 Apt. 26 , León, 68602', 'igimeno@ortuno-montenegro.es', '113a117e0208c3b2af2c6f75a3a86945586ab9ea7f1ef71e57b4d93ca3b7dfa4', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:49:13', '524a0f17983948127247797fbcc50b3346e6a6a9');
INSERT INTO public.usuarios VALUES (9, 'Régulo Montaña Moraleda', '91891021H', 'Plaza de Azahara Arregui 25 Apt. 85 , Cantabria, 44864', 'salome30@yahoo.com', 'fabe05877eb4125cd5ec5b0e24f02a264ff99121285597509ee3fe91622d9896', '/images/defaults/avatar.jpg', 'admin', '2025-05-13 21:49:19', 'a9de63e19894eab88d047272f76f8995eaa91911');
INSERT INTO public.usuarios VALUES (10, 'Natalia Ros', '74669736Y', 'Cuesta de Ildefonso Navas 10 Apt. 25 , Girona, 21639', 'wilfredofernandez@yahoo.com', 'a1e626e8c3a5214f7aa6a5d5d9fb4f0c23089521ea2f1dcb34520d975964bec0', '/images/defaults/avatar.jpg', 'admin', '2025-05-13 21:49:24', 'e27281d5fcba4c0bbc91f4712beace8bbadc0184');
INSERT INTO public.usuarios VALUES (11, 'Xavier Estévez', '28097597S', 'Ronda de Noemí Téllez 43 Piso 3 , Jaén, 31250', 'emilianamartorell@bolanos.es', '6a466a9cb31ab206ff6f6b7c146b5908399fdda620f24f94f5d5ebb9f2458560', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:49:30', '11f96b2548e3371bb2b06e50adfcaf6567522dba');
INSERT INTO public.usuarios VALUES (12, 'Lamine Yamal', '50293890L', 'calle libertad 21', 'brandonmuzo15@gmail.com', '$2y$12$lZAO0E61isdhBuTHJI.aROFoSnLpPwlViHuzTIgsXV9GfGkTrMExa', '/images/defaults/avatar.jpg', 'user', '2025-05-21 10:04:45', NULL);
INSERT INTO public.usuarios VALUES (13, 'Leonel Andres Messi Cuccitini', '10101010M', 'Calle Buenos Aires', 'fitlandtfg@gmail.com', '$2y$12$d/ajEWGB8csGtTJGriz0j.NVBSiwQApPASeSwLd.cQmUnyPFBolJy', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:25:01', NULL);
INSERT INTO public.usuarios VALUES (14, 'Cristiano Ronaldo', '07070707C', 'Calle portugal', 'cristiano7@gmail.com', '$2y$12$/3fVwW.OOS/1kBMClwZ0CuAFqFQk9cVoif74vgcB30IMTfDZeOTm.', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:26:07', NULL);
INSERT INTO public.usuarios VALUES (15, 'Imanol Kery Medina', 'X3628899H', 'calle de las cruces', 'cuenwamp@gmail.com', '$2y$12$doqEr8NPy3ljCkxSq6wA6uUNJ1vFWqI2jN6vdJWoKlR1y/zIy.kdO', '/images/defaults/avatar.jpg', 'admin', '2025-05-13 21:48:08', NULL);
INSERT INTO public.usuarios VALUES (16, 'Dan Rafael Heredia Barón', '65622240C', 'Acceso Eusebia Tenorio 39 Apt. 08 , Huesca, 26228', 'maria-del-carmenfabregas@garcia-gutierrez.com', 'c474ef5f005f4cd4ef1138c324432b26f15e3d8aa521ed613c4a3a9583bcfdfa', '/images/defaults/avatar.jpg', 'user', '2025-05-13 21:48:13', '047a8e6ff9af668fcc2c056a94939191a7b4df00');
INSERT INTO public.usuarios VALUES (17, 'Macarena Rocío Fortuny Martin', '51647436Q', 'Callejón de Jesús Alegre 2 Apt. 63 , Girona, 88601', 'diego95@gmail.com', 'df8dba5e5ccfe30f94f7d6442c4294ea3283fba72888b25cca429ae3d01658ab', '/images/defaults/avatar.jpg', 'admin', '2025-05-13 21:48:17', 'f6426fd626b5d091cb06a8760960854351c371f3');

ALTER SEQUENCE usuarios_id_seq RESTART WITH 18;



INSERT INTO public.planes_suscripcion VALUES (1, 'Silver Mensual', 9.99, 'Silver', 30);
INSERT INTO public.planes_suscripcion VALUES (2, 'Silver Anual', 99.99, 'Silver', 365);
INSERT INTO public.planes_suscripcion VALUES (3, 'Gold Mensual', 14.99, 'Gold', 30);
INSERT INTO public.planes_suscripcion VALUES (4, 'Gold Anual', 149.99, 'Gold', 365);
INSERT INTO public.planes_suscripcion VALUES (5, 'Diamond Mensual', 19.99, 'Diamond', 30);
INSERT INTO public.planes_suscripcion VALUES (6, 'Diamond Anual', 199.99, 'Diamond', 365);
INSERT INTO public.planes_suscripcion VALUES (7, 'Plan prueba', 120, 'Prueba', 120);

ALTER SEQUENCE planes_suscripcion_id_seq RESTART WITH 8;



INSERT INTO public.suscripciones VALUES (1, 1, 2, 14.99, '2025-04-01', '2025-04-30', 'expirada', NULL, NULL);
INSERT INTO public.suscripciones VALUES (2, 2, 1, 9.99, '2025-04-14', '2025-05-14', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (3, 3, 4, 149.99, '2025-02-13', '2025-03-15', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (4, 4, 2, 99.99, '2025-02-11', '2025-03-13', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (5, 5, 4, 149.99, '2025-04-28', '2025-05-28', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (6, 6, 5, 19.99, '2025-03-02', '2025-04-01', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (7, 7, 4, 149.99, '2025-04-11', '2025-05-11', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (8, 8, 3, 14.99, '2025-03-12', '2025-04-11', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (9, 9, 4, 149.99, '2025-02-19', '2025-03-21', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (10, 10, 2, 99.99, '2025-03-27', '2025-04-26', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (11, 11, 2, 99.99, '2025-04-04', '2025-05-04', 'activa', NULL, NULL);
INSERT INTO public.suscripciones VALUES (12, 12, 2, 99.99, '2025-05-04', '2026-05-04', 'activa', '2025-05-12 20:35:07', '2025-05-13 20:51:03');
INSERT INTO public.suscripciones VALUES (13, 13, 7, 120, '2025-09-30', '2025-10-30', 'activa', '2025-05-13 21:31:19', '2025-05-13 21:31:19');

ALTER SEQUENCE suscripciones_id_seq RESTART WITH 14;

-- Semana del 2 al 8 de junio (lunes a domingo), 10 clases por día
-- ID del 1 al 70

INSERT INTO public.clases VALUES (1, 'Zumba', '2025-06-02 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (2, 'Pilates', '2025-06-02 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (3, 'GAP', '2025-06-02 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (4, 'HIIT', '2025-06-02 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (5, 'Full Body Workout', '2025-06-02 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (6, 'Cardio Dance', '2025-06-02 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (7, 'Yoga', '2025-06-02 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (8, 'Entrenamiento Funcional', '2025-06-02 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (9, 'Boxeo', '2025-06-02 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (10, 'Kickboxing', '2025-06-02 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (11, 'Zumba', '2025-06-03 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (12, 'Pilates', '2025-06-03 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (13, 'GAP', '2025-06-03 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (14, 'HIIT', '2025-06-03 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (15, 'Full Body Workout', '2025-06-03 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (16, 'Cardio Dance', '2025-06-03 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (17, 'Yoga', '2025-06-03 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (18, 'Entrenamiento Funcional', '2025-06-03 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (19, 'Boxeo', '2025-06-03 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (20, 'Kickboxing', '2025-06-03 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (21, 'Zumba', '2025-06-04 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (22, 'Pilates', '2025-06-04 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (23, 'GAP', '2025-06-04 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (24, 'HIIT', '2025-06-04 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (25, 'Full Body Workout', '2025-06-04 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (26, 'Cardio Dance', '2025-06-04 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (27, 'Yoga', '2025-06-04 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (28, 'Entrenamiento Funcional', '2025-06-04 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (29, 'Boxeo', '2025-06-04 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (30, 'Kickboxing', '2025-06-04 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (31, 'Zumba', '2025-06-05 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (32, 'Pilates', '2025-06-05 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (33, 'GAP', '2025-06-05 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (34, 'HIIT', '2025-06-05 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (35, 'Full Body Workout', '2025-06-05 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (36, 'Cardio Dance', '2025-06-05 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (37, 'Yoga', '2025-06-05 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (38, 'Entrenamiento Funcional', '2025-06-05 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (39, 'Boxeo', '2025-06-05 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (40, 'Kickboxing', '2025-06-05 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (41, 'Zumba', '2025-06-06 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (42, 'Pilates', '2025-06-06 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (43, 'GAP', '2025-06-06 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (44, 'HIIT', '2025-06-06 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (45, 'Full Body Workout', '2025-06-06 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (46, 'Cardio Dance', '2025-06-06 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (47, 'Yoga', '2025-06-06 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (48, 'Entrenamiento Funcional', '2025-06-06 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (49, 'Boxeo', '2025-06-06 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (50, 'Kickboxing', '2025-06-06 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (51, 'Zumba', '2025-06-07 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (52, 'Pilates', '2025-06-07 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (53, 'GAP', '2025-06-07 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (54, 'HIIT', '2025-06-07 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (55, 'Full Body Workout', '2025-06-07 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (56, 'Cardio Dance', '2025-06-07 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (57, 'Yoga', '2025-06-07 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (58, 'Entrenamiento Funcional', '2025-06-07 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (59, 'Boxeo', '2025-06-07 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (60, 'Kickboxing', '2025-06-07 20:00:00', 12, NULL, NULL);

INSERT INTO public.clases VALUES (61, 'Zumba', '2025-06-08 08:00:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (62, 'Pilates', '2025-06-08 09:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (63, 'GAP', '2025-06-08 10:40:00', 15, NULL, NULL);
INSERT INTO public.clases VALUES (64, 'HIIT', '2025-06-08 12:00:00', 16, NULL, NULL);
INSERT INTO public.clases VALUES (65, 'Full Body Workout', '2025-06-08 13:20:00', 18, NULL, NULL);
INSERT INTO public.clases VALUES (66, 'Cardio Dance', '2025-06-08 14:40:00', 22, NULL, NULL);
INSERT INTO public.clases VALUES (67, 'Yoga', '2025-06-08 16:00:00', 12, NULL, NULL);
INSERT INTO public.clases VALUES (68, 'Entrenamiento Funcional', '2025-06-08 17:20:00', 20, NULL, NULL);
INSERT INTO public.clases VALUES (69, 'Boxeo', '2025-06-08 18:40:00', 14, NULL, NULL);
INSERT INTO public.clases VALUES (70, 'Kickboxing', '2025-06-08 20:00:00', 12, NULL, NULL);


ALTER SEQUENCE clases_id_seq RESTART WITH 71;

INSERT INTO public.productos (id, tipo, nombre, descripcion, precio, imagen, stock, created_at, updated_at) VALUES
(1, 'ropa', 'Camiseta técnica (S)', 'Camiseta deportiva transpirable y ligera, talla S.', 12.99, 'https://via.placeholder.com/100x100?text=Camiseta+S', 20, NULL, NULL),
(2, 'ropa', 'Camiseta técnica (M)', 'Camiseta deportiva transpirable y ligera, talla M.', 12.99, 'https://via.placeholder.com/100x100?text=Camiseta+M', 25, NULL, NULL),
(3, 'ropa', 'Camiseta técnica (L)', 'Camiseta deportiva transpirable y ligera, talla L.', 12.99, 'https://via.placeholder.com/100x100?text=Camiseta+L', 25, NULL, NULL),
(4, 'ropa', 'Camiseta técnica (XL)', 'Camiseta deportiva transpirable y ligera, talla XL.', 12.99, 'https://via.placeholder.com/100x100?text=Camiseta+XL', 15, NULL, NULL),
(5, 'ropa', 'Sudadera (S)', 'Sudadera cómoda con capucha, ideal para después del gym.', 24.99, 'https://via.placeholder.com/100x100?text=Sudadera+S', 10, NULL, NULL),
(6, 'ropa', 'Sudadera (M)', 'Sudadera cómoda con capucha, ideal para después del gym.', 24.99, 'https://via.placeholder.com/100x100?text=Sudadera+M', 12, NULL, NULL),
(7, 'ropa', 'Sudadera (XL)', 'Sudadera cómoda con capucha, ideal para después del gym.', 24.99, 'https://via.placeholder.com/100x100?text=Sudadera+XL', 8, NULL, NULL),
(8, 'ropa', 'Mochila deportiva', 'Mochila ligera y resistente con compartimentos útiles.', 19.99, 'https://via.placeholder.com/100x100?text=Mochila', 18, NULL, NULL),
(9, 'suplemento', 'Proteína Whey (chocolate)', 'Proteína de suero sabor chocolate (1 kg), ideal para recuperación post-entreno.', 29.99, 'https://via.placeholder.com/100x100?text=Whey+Chocolate', 30, NULL, NULL),
(10, 'suplemento', 'Proteína Whey (vainilla)', 'Proteína de suero sabor vainilla (1 kg), fácil digestión y alto valor biológico.', 29.99, 'https://via.placeholder.com/100x100?text=Whey+Vainilla', 25, NULL, NULL),
(11, 'suplemento', 'Proteína vegetal (veganos)', 'Mezcla vegetal sin lactosa (1 kg), perfecta para dietas veganas o intolerancias.', 31.99, 'https://via.placeholder.com/100x100?text=Vegana', 20, NULL, NULL),
(12, 'suplemento', 'Pre-entreno en polvo (cafeína + beta-A)', 'Pre-workout con cafeína y beta-alanina (300 g) para energía y enfoque.', 19.99, 'https://via.placeholder.com/100x100?text=Pre+Workout', 18, NULL, NULL),
(13, 'suplemento', 'Creatina monohidrato', 'Creatina pura monohidrato (500 g) para mejorar fuerza y rendimiento.', 16.99, 'https://via.placeholder.com/100x100?text=Creatina', 40, NULL, NULL),
(14, 'suplemento', 'Multivitamínicos deportivos', 'Complejo vitamínico en cápsulas (90 uds) para atletas y deportistas.', 12.49, 'https://via.placeholder.com/100x100?text=Vitaminas', 15, NULL, NULL),
(15, 'suplemento', 'Barritas proteicas (chocolate/frutos)', 'Barrita proteica de 60 g ideal para snack post-entreno o media mañana.', 2.99, 'https://via.placeholder.com/100x100?text=Barrita', 50, NULL, NULL),
(16, 'suplemento', 'Galletas proteicas', 'Galleta proteica gourmet de 75 g, alta en proteína y sabor.', 3.49, 'https://via.placeholder.com/100x100?text=Galleta', 20, NULL, NULL),
(17, 'bebida', 'Agua mineral (500 ml)', 'Botella de agua natural (500 ml), ideal para hidratarse durante el entreno.', 0.99, 'https://via.placeholder.com/100x100?text=Agua+500ml', 50, NULL, NULL),
(18, 'bebida', 'Agua mineral (1,5 L)', 'Botella grande de agua mineral (1,5 L) para sesiones largas o días calurosos.', 1.49, 'https://via.placeholder.com/100x100?text=Agua+1.5L', 30, NULL, NULL),
(19, 'bebida', 'Bebida isotónica (500 ml)', 'Bebida deportiva (500 ml) con electrolitos para una rápida rehidratación.', 1.79, 'https://via.placeholder.com/100x100?text=Isotonica', 40, NULL, NULL),
(20, 'bebida', 'Bebida energética (500 ml)', 'Lata energética (500 ml) con cafeína, ideal para mejorar el enfoque.', 2.20, 'https://via.placeholder.com/100x100?text=Energetica', 35, NULL, NULL),
(21, 'bebida', 'Zumo natural (330 ml)', 'Zumo natural de frutas (330 ml), sin azúcares añadidos, refrescante y sano.', 1.60, 'https://via.placeholder.com/100x100?text=Zumo', 25, NULL, NULL),
(22, 'bebida', 'Agua con gas saborizada (330 ml)', 'Lata de agua con gas saborizada (330 ml), alternativa sin azúcar al refresco.', 1.20, 'https://via.placeholder.com/100x100?text=Agua+Saborizada', 28, NULL, NULL),
(23, 'accesorio', 'Guantes de entrenamiento', 'Guantes acolchados para proteger las manos al usar mancuernas y barras.', 14.99, 'https://via.placeholder.com/100x100?text=Guantes', 20, NULL, NULL),
(24, 'accesorio', 'Vendas para boxeo', 'Vendas elásticas (2,5 m) para proteger muñecas y nudillos.', 7.99, 'https://via.placeholder.com/100x100?text=Vendas', 30, NULL, NULL),
(25, 'accesorio', 'Botella reutilizable', 'Botella de 750 ml con cierre hermético, ideal para entrenamientos largos.', 9.99, 'https://via.placeholder.com/100x100?text=Botella', 25, NULL, NULL),
(26, 'accesorio', 'Esterilla de yoga', 'Esterilla antideslizante de 180×60 cm, perfecta para yoga o estiramientos.', 17.99, 'https://via.placeholder.com/100x100?text=Esterilla', 15, NULL, NULL),
(27, 'accesorio', 'Toalla de microfibra', 'Toalla ligera y absorbente, ideal para entreno o duchas rápidas.', 5.99, 'https://via.placeholder.com/100x100?text=Toalla', 40, NULL, NULL),
(28, 'accesorio', 'Comba de velocidad', 'Cuerda ajustable con rodamientos para entrenamientos de cardio o boxeo.', 8.49, 'https://via.placeholder.com/100x100?text=Comba', 18, NULL, NULL);

ALTER SEQUENCE productos_id_seq RESTART WITH 29;
