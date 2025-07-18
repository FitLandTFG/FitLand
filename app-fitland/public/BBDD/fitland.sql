PGDMP  %                    }           fitland    17.4    17.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    18198    fitland    DATABASE     m   CREATE DATABASE fitland WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';
    DROP DATABASE fitland;
                     postgres    false            p           1247    18200    estadopago_enum    TYPE     a   CREATE TYPE public.estadopago_enum AS ENUM (
    'pendiente',
    'completado',
    'fallido'
);
 "   DROP TYPE public.estadopago_enum;
       public               postgres    false            s           1247    18208    rolesusuarios_enum    TYPE     K   CREATE TYPE public.rolesusuarios_enum AS ENUM (
    'user',
    'admin'
);
 %   DROP TYPE public.rolesusuarios_enum;
       public               postgres    false            v           1247    18214    tipoplansuscripcion_enum    TYPE     o   CREATE TYPE public.tipoplansuscripcion_enum AS ENUM (
    'Prueba',
    'Silver',
    'Gold',
    'Diamond'
);
 +   DROP TYPE public.tipoplansuscripcion_enum;
       public               postgres    false            �            1259    18223    cache    TABLE     �   CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache;
       public         heap r       postgres    false            �            1259    18228    cache_locks    TABLE     �   CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache_locks;
       public         heap r       postgres    false            �            1259    18233    clases    TABLE       CREATE TABLE public.clases (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    horario timestamp without time zone NOT NULL,
    aforo smallint NOT NULL,
    updated_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone
);
    DROP TABLE public.clases;
       public         heap r       postgres    false            �            1259    18236    clases_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.clases_id_seq;
       public               postgres    false    219            �           0    0    clases_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.clases_id_seq OWNED BY public.clases.id;
          public               postgres    false    220            �            1259    18453    compras    TABLE     5  CREATE TABLE public.compras (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    fecha_compra timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    stock_descargado boolean DEFAULT false
);
    DROP TABLE public.compras;
       public         heap r       postgres    false            �            1259    18452    compras_id_seq    SEQUENCE     �   CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.compras_id_seq;
       public               postgres    false    245            �           0    0    compras_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;
          public               postgres    false    244            �            1259    18466    detalle_compras    TABLE     
  CREATE TABLE public.detalle_compras (
    id integer NOT NULL,
    compra_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 #   DROP TABLE public.detalle_compras;
       public         heap r       postgres    false            �            1259    18465    detalle_compras_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.detalle_compras_id_seq;
       public               postgres    false    247            �           0    0    detalle_compras_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.detalle_compras_id_seq OWNED BY public.detalle_compras.id;
          public               postgres    false    246            �            1259    18241    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap r       postgres    false            �            1259    18247    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public               postgres    false    221            �           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public               postgres    false    222            �            1259    18248    inscripciones    TABLE       CREATE TABLE public.inscripciones (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    clase_id integer NOT NULL,
    fecha_inscripcion timestamp without time zone,
    updated_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone
);
 !   DROP TABLE public.inscripciones;
       public         heap r       postgres    false            �            1259    18251    inscripciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.inscripciones_id_seq;
       public               postgres    false    223            �           0    0    inscripciones_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.inscripciones_id_seq OWNED BY public.inscripciones.id;
          public               postgres    false    224            �            1259    18252    job_batches    TABLE     d  CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);
    DROP TABLE public.job_batches;
       public         heap r       postgres    false            �            1259    18257    jobs    TABLE     �   CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);
    DROP TABLE public.jobs;
       public         heap r       postgres    false            �            1259    18262    jobs_id_seq    SEQUENCE     t   CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.jobs_id_seq;
       public               postgres    false    226            �           0    0    jobs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;
          public               postgres    false    227            �            1259    18263 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap r       postgres    false            �            1259    18266    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public               postgres    false    228            �           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public               postgres    false    229            �            1259    18484    pagos    TABLE     �  CREATE TABLE public.pagos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    compra_id integer,
    metodo_pago character varying(50) NOT NULL,
    estado public.estadopago_enum DEFAULT 'pendiente'::public.estadopago_enum,
    monto double precision NOT NULL,
    transaccion_id character varying(100),
    fecha_pago timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    suscripcion_id integer
);
    DROP TABLE public.pagos;
       public         heap r       postgres    false    880    880            �            1259    18483    pagos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.pagos_id_seq;
       public               postgres    false    249            �           0    0    pagos_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;
          public               postgres    false    248            �            1259    18596    pagos_temporales    TABLE     +  CREATE TABLE public.pagos_temporales (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    carrito json NOT NULL,
    total numeric(8,2) NOT NULL,
    session_id character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 $   DROP TABLE public.pagos_temporales;
       public         heap r       postgres    false            �            1259    18595    pagos_temporales_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagos_temporales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.pagos_temporales_id_seq;
       public               postgres    false    251            �           0    0    pagos_temporales_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.pagos_temporales_id_seq OWNED BY public.pagos_temporales.id;
          public               postgres    false    250            �            1259    18273    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap r       postgres    false            �            1259    18278    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap r       postgres    false            �            1259    18283    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public               postgres    false    231            �           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public               postgres    false    232            �            1259    18284    planes_suscripcion    TABLE     �   CREATE TABLE public.planes_suscripcion (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    precio double precision NOT NULL,
    tipo public.tipoplansuscripcion_enum NOT NULL,
    duracion_dias smallint NOT NULL
);
 &   DROP TABLE public.planes_suscripcion;
       public         heap r       postgres    false    886            �            1259    18287    planes_suscripcion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.planes_suscripcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.planes_suscripcion_id_seq;
       public               postgres    false    233            �           0    0    planes_suscripcion_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.planes_suscripcion_id_seq OWNED BY public.planes_suscripcion.id;
          public               postgres    false    234            �            1259    18288 	   productos    TABLE     S  CREATE TABLE public.productos (
    id integer NOT NULL,
    tipo character varying(20) NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text NOT NULL,
    precio double precision NOT NULL,
    imagen text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    stock smallint DEFAULT 0 NOT NULL,
    CONSTRAINT productos_stock_check CHECK (((stock >= 0) AND (stock <= 999))),
    CONSTRAINT productos_tipo_check CHECK (((tipo)::text = ANY (ARRAY['ropa'::text, 'suplemento'::text, 'bebida'::text, 'accesorio'::text])))
);
    DROP TABLE public.productos;
       public         heap r       postgres    false            �            1259    18294    productos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public               postgres    false    235            �           0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public               postgres    false    236            �            1259    18295    sessions    TABLE     �   CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);
    DROP TABLE public.sessions;
       public         heap r       postgres    false            �            1259    18300    suscripciones    TABLE     �  CREATE TABLE public.suscripciones (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    plan_id integer NOT NULL,
    precio double precision NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(20) DEFAULT 'activa'::character varying,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 !   DROP TABLE public.suscripciones;
       public         heap r       postgres    false            �            1259    18304    suscripciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.suscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.suscripciones_id_seq;
       public               postgres    false    238            �           0    0    suscripciones_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.suscripciones_id_seq OWNED BY public.suscripciones.id;
          public               postgres    false    239            �            1259    18305    users    TABLE     x  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    18310    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    240            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    241            �            1259    18311    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying(100) NOT NULL,
    documentacion character varying(9) NOT NULL,
    domicilio character varying(150) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    imagen text NOT NULL,
    roles public.rolesusuarios_enum DEFAULT 'user'::public.rolesusuarios_enum,
    email_verified_at timestamp without time zone,
    remember_token character varying(100)
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false    883    883            �            1259    18317    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    242            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    243            �           2604    18318 	   clases id    DEFAULT     f   ALTER TABLE ONLY public.clases ALTER COLUMN id SET DEFAULT nextval('public.clases_id_seq'::regclass);
 8   ALTER TABLE public.clases ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            �           2604    18456 
   compras id    DEFAULT     h   ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);
 9   ALTER TABLE public.compras ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    245    244    245            �           2604    18469    detalle_compras id    DEFAULT     x   ALTER TABLE ONLY public.detalle_compras ALTER COLUMN id SET DEFAULT nextval('public.detalle_compras_id_seq'::regclass);
 A   ALTER TABLE public.detalle_compras ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    246    247    247            �           2604    18320    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221            �           2604    18321    inscripciones id    DEFAULT     t   ALTER TABLE ONLY public.inscripciones ALTER COLUMN id SET DEFAULT nextval('public.inscripciones_id_seq'::regclass);
 ?   ALTER TABLE public.inscripciones ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223            �           2604    18322    jobs id    DEFAULT     b   ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);
 6   ALTER TABLE public.jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    226            �           2604    18323    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    229    228            �           2604    18487    pagos id    DEFAULT     d   ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);
 7   ALTER TABLE public.pagos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    248    249    249            �           2604    18599    pagos_temporales id    DEFAULT     z   ALTER TABLE ONLY public.pagos_temporales ALTER COLUMN id SET DEFAULT nextval('public.pagos_temporales_id_seq'::regclass);
 B   ALTER TABLE public.pagos_temporales ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    251    250    251            �           2604    18325    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    232    231            �           2604    18326    planes_suscripcion id    DEFAULT     ~   ALTER TABLE ONLY public.planes_suscripcion ALTER COLUMN id SET DEFAULT nextval('public.planes_suscripcion_id_seq'::regclass);
 D   ALTER TABLE public.planes_suscripcion ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    233            �           2604    18327    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    235            �           2604    18328    suscripciones id    DEFAULT     t   ALTER TABLE ONLY public.suscripciones ALTER COLUMN id SET DEFAULT nextval('public.suscripciones_id_seq'::regclass);
 ?   ALTER TABLE public.suscripciones ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    239    238            �           2604    18329    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    241    240            �           2604    18330    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    243    242            n          0    18223    cache 
   TABLE DATA           7   COPY public.cache (key, value, expiration) FROM stdin;
    public               postgres    false    217   ��       o          0    18228    cache_locks 
   TABLE DATA           =   COPY public.cache_locks (key, owner, expiration) FROM stdin;
    public               postgres    false    218   ��       p          0    18233    clases 
   TABLE DATA           T   COPY public.clases (id, nombre, horario, aforo, updated_at, created_at) FROM stdin;
    public               postgres    false    219   �       �          0    18453    compras 
   TABLE DATA           i   COPY public.compras (id, usuario_id, fecha_compra, created_at, updated_at, stock_descargado) FROM stdin;
    public               postgres    false    245   ��       �          0    18466    detalle_compras 
   TABLE DATA           g   COPY public.detalle_compras (id, compra_id, producto_id, cantidad, created_at, updated_at) FROM stdin;
    public               postgres    false    247   Z�       r          0    18241    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public               postgres    false    221   *�       t          0    18248    inscripciones 
   TABLE DATA           l   COPY public.inscripciones (id, usuario_id, clase_id, fecha_inscripcion, updated_at, created_at) FROM stdin;
    public               postgres    false    223   G�       v          0    18252    job_batches 
   TABLE DATA           �   COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
    public               postgres    false    225   M�       w          0    18257    jobs 
   TABLE DATA           c   COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
    public               postgres    false    226   j�       y          0    18263 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public               postgres    false    228   ��       �          0    18484    pagos 
   TABLE DATA           �   COPY public.pagos (id, usuario_id, compra_id, metodo_pago, estado, monto, transaccion_id, fecha_pago, created_at, updated_at, suscripcion_id) FROM stdin;
    public               postgres    false    249   :�       �          0    18596    pagos_temporales 
   TABLE DATA           n   COPY public.pagos_temporales (id, usuario_id, carrito, total, session_id, created_at, updated_at) FROM stdin;
    public               postgres    false    251   �       {          0    18273    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public               postgres    false    230   (�       |          0    18278    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public               postgres    false    231   ��       ~          0    18284    planes_suscripcion 
   TABLE DATA           U   COPY public.planes_suscripcion (id, nombre, precio, tipo, duracion_dias) FROM stdin;
    public               postgres    false    233   ��       �          0    18288 	   productos 
   TABLE DATA           q   COPY public.productos (id, tipo, nombre, descripcion, precio, imagen, created_at, updated_at, stock) FROM stdin;
    public               postgres    false    235   g�       �          0    18295    sessions 
   TABLE DATA           _   COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
    public               postgres    false    237   ��       �          0    18300    suscripciones 
   TABLE DATA           �   COPY public.suscripciones (id, usuario_id, plan_id, precio, fecha_inicio, fecha_fin, estado, created_at, updated_at) FROM stdin;
    public               postgres    false    238   ��       �          0    18305    users 
   TABLE DATA           u   COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
    public               postgres    false    240   i�       �          0    18311    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, nombre_completo, documentacion, domicilio, email, password, imagen, roles, email_verified_at, remember_token) FROM stdin;
    public               postgres    false    242   ��       �           0    0    clases_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clases_id_seq', 71, false);
          public               postgres    false    220            �           0    0    compras_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.compras_id_seq', 50, true);
          public               postgres    false    244            �           0    0    detalle_compras_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.detalle_compras_id_seq', 75, true);
          public               postgres    false    246            �           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public               postgres    false    222            �           0    0    inscripciones_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.inscripciones_id_seq', 32, true);
          public               postgres    false    224            �           0    0    jobs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);
          public               postgres    false    227            �           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);
          public               postgres    false    229            �           0    0    pagos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.pagos_id_seq', 66, true);
          public               postgres    false    248            �           0    0    pagos_temporales_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.pagos_temporales_id_seq', 1, false);
          public               postgres    false    250            �           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public               postgres    false    232            �           0    0    planes_suscripcion_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.planes_suscripcion_id_seq', 8, true);
          public               postgres    false    234            �           0    0    productos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.productos_id_seq', 29, true);
          public               postgres    false    236            �           0    0    suscripciones_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.suscripciones_id_seq', 46, true);
          public               postgres    false    239            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    241            �           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 18, true);
          public               postgres    false    243            �           2606    18332    cache_locks cache_locks_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);
 F   ALTER TABLE ONLY public.cache_locks DROP CONSTRAINT cache_locks_pkey;
       public                 postgres    false    218            �           2606    18334    cache cache_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);
 :   ALTER TABLE ONLY public.cache DROP CONSTRAINT cache_pkey;
       public                 postgres    false    217            �           2606    18336    clases clases_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.clases
    ADD CONSTRAINT clases_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.clases DROP CONSTRAINT clases_pkey;
       public                 postgres    false    219            �           2606    18459    compras compras_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.compras DROP CONSTRAINT compras_pkey;
       public                 postgres    false    245            �           2606    18472 $   detalle_compras detalle_compras_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.detalle_compras DROP CONSTRAINT detalle_compras_pkey;
       public                 postgres    false    247            �           2606    18340    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public                 postgres    false    221            �           2606    18342 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public                 postgres    false    221            �           2606    18344     inscripciones inscripciones_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_pkey;
       public                 postgres    false    223            �           2606    18346    job_batches job_batches_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.job_batches DROP CONSTRAINT job_batches_pkey;
       public                 postgres    false    225            �           2606    18348    jobs jobs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.jobs DROP CONSTRAINT jobs_pkey;
       public                 postgres    false    226            �           2606    18350    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public                 postgres    false    228            �           2606    18491    pagos pagos_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_pkey;
       public                 postgres    false    249            �           2606    18603 &   pagos_temporales pagos_temporales_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.pagos_temporales
    ADD CONSTRAINT pagos_temporales_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.pagos_temporales DROP CONSTRAINT pagos_temporales_pkey;
       public                 postgres    false    251            �           2606    18610 3   pagos_temporales pagos_temporales_session_id_unique 
   CONSTRAINT     t   ALTER TABLE ONLY public.pagos_temporales
    ADD CONSTRAINT pagos_temporales_session_id_unique UNIQUE (session_id);
 ]   ALTER TABLE ONLY public.pagos_temporales DROP CONSTRAINT pagos_temporales_session_id_unique;
       public                 postgres    false    251            �           2606    18354 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public                 postgres    false    230            �           2606    18356 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public                 postgres    false    231            �           2606    18358 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public                 postgres    false    231            �           2606    18360 *   planes_suscripcion planes_suscripcion_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.planes_suscripcion
    ADD CONSTRAINT planes_suscripcion_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.planes_suscripcion DROP CONSTRAINT planes_suscripcion_pkey;
       public                 postgres    false    233            �           2606    18362    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public                 postgres    false    235            �           2606    18364    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public                 postgres    false    237            �           2606    18366     suscripciones suscripciones_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.suscripciones DROP CONSTRAINT suscripciones_pkey;
       public                 postgres    false    238            �           2606    18368    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public                 postgres    false    240            �           2606    18370    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    240            �           2606    18372    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    242            �           1259    18373    jobs_queue_index    INDEX     B   CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);
 $   DROP INDEX public.jobs_queue_index;
       public                 postgres    false    226            �           1259    18374 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public                 postgres    false    231    231            �           1259    18375    sessions_last_activity_index    INDEX     Z   CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);
 0   DROP INDEX public.sessions_last_activity_index;
       public                 postgres    false    237            �           1259    18376    sessions_user_id_index    INDEX     N   CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);
 *   DROP INDEX public.sessions_user_id_index;
       public                 postgres    false    237            �           2606    18460    compras compras_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 I   ALTER TABLE ONLY public.compras DROP CONSTRAINT compras_usuario_id_fkey;
       public               postgres    false    242    245    4807            �           2606    18473 .   detalle_compras detalle_compras_compra_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_compra_id_fkey FOREIGN KEY (compra_id) REFERENCES public.compras(id);
 X   ALTER TABLE ONLY public.detalle_compras DROP CONSTRAINT detalle_compras_compra_id_fkey;
       public               postgres    false    4809    245    247            �           2606    18478 0   detalle_compras detalle_compras_producto_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);
 Z   ALTER TABLE ONLY public.detalle_compras DROP CONSTRAINT detalle_compras_producto_id_fkey;
       public               postgres    false    4795    235    247            �           2606    18387 )   inscripciones inscripciones_clase_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_clase_id_fkey FOREIGN KEY (clase_id) REFERENCES public.clases(id);
 S   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_clase_id_fkey;
       public               postgres    false    219    223    4771            �           2606    18392 +   inscripciones inscripciones_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 U   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_usuario_id_fkey;
       public               postgres    false    223    242    4807            �           2606    18497    pagos pagos_compra_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_compra_id_fkey FOREIGN KEY (compra_id) REFERENCES public.compras(id);
 D   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_compra_id_fkey;
       public               postgres    false    245    249    4809            �           2606    18590 "   pagos pagos_suscripcion_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_suscripcion_id_foreign FOREIGN KEY (suscripcion_id) REFERENCES public.suscripciones(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_suscripcion_id_foreign;
       public               postgres    false    4801    249    238            �           2606    18604 4   pagos_temporales pagos_temporales_usuario_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos_temporales
    ADD CONSTRAINT pagos_temporales_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.pagos_temporales DROP CONSTRAINT pagos_temporales_usuario_id_foreign;
       public               postgres    false    4807    242    251            �           2606    18492    pagos pagos_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 E   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_usuario_id_fkey;
       public               postgres    false    242    4807    249            �           2606    18407 (   suscripciones suscripciones_plan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.planes_suscripcion(id);
 R   ALTER TABLE ONLY public.suscripciones DROP CONSTRAINT suscripciones_plan_id_fkey;
       public               postgres    false    233    238    4793            �           2606    18412 +   suscripciones suscripciones_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 U   ALTER TABLE ONLY public.suscripciones DROP CONSTRAINT suscripciones_usuario_id_fkey;
       public               postgres    false    4807    242    238            n   G  x����n�0F��à$�k���A&!'q ��&
�f���O�F��O�|tl��-�^kY&��}� (�y
��!�����>��m��6�4W�/�!�$j����aۦV��z��jxS��G��U����i��u�Y�/�A���t>�lB_&����8
�P���{j����r#��:m���)�e�I�$�yB�_��\	5��+�{L�������ƮMi�B�c�U�Z��<�9��Cd�АB�X}~�u/&Ё�M0Ɋ��{�Q0��cLZU�R)���}�H=ˍc���(��[��3��Ʃ�m^�p�aX      o      x������ � �      p   Y  x����j�0���S�Rt���kڦ��E�4d�L�`2�a:���6vkI���,�9ǒ��Ɉ���P^wO����;�K6W�^�-IU,+)y���V|��OMW~���>��J�Y�)���2��ϛ3^|jO�}[�6��ԕ7�v�tm}�jn�˩�u����'=�H�����{k��et|X4���9ԧ��9Wʐ�>)����2Cr��-���~�B<h��"� yZC� zJ�;��.�� |��;@�1}�3�����b���~J���#q��G�:��o:���9����<p�8��g�<p��#)@? �*� }����ڤ }�F? �*� }u� 諌~ �5� }���`���ѐ���Q�������-GC#s�W�̑N�̑�����9ҩ�!�92�Q���G8"��$�82�#�̦#�̚#�Lꈀ#s�#�L戀#�pd}�mB�}��g@�n�gt�Z�π�M�3�o/�π���3��0}F����
�o�q?�\��Y����8�%7�gg��=V_�6iˮ�Tec+��E��Z�j`K���1D��������n�kgģNo�_V��(�?
}�W      �   �  x���ˍ$!D�SV���/[����ڠV+uCJ��B�� �~ɗV���?�ߵ�{�3�StJR��T�)�Π�G
�YeP�S�eP�Ř�(�")$f��|�P���Aў)G������Bt(̷^h�6�b|*�Ϊexx6Q��죤�-���kqM�"�`�̈́c���>"YDLz�lL��kK��(��iV<2���2�|3����T�.�E���IdF+Mc�`e0�i2�b�.f�"�`j����/.-j��2��iB���L=�E��4S�GX�T=~�o���.�;��VǛ���N�2������-J���YDL{�1�0G��Z7�P�^���ؒ�����sF�1���c�Y����Q�{�^�qU+cd��"�|��ǂ��A�^[짻�w��t�{O[�aY+�b9XDX_�~�l�b!㳄�#�`�Iמs��=�akOQOS���J#�~�?庮��#�V      �   �  x����m1��U�⡋���:B*6C����y�C|Z!��!~����N�Fˈ�(���n�6ZC��\eQ�6+�2�xV�C����#��ɪ���C�s�[��������6&��o�JG�{�V��g���3�PO��<��f�~�䎡Q
w��C -���h���hn�:���-��"��z��b��+�l�Q1�D*��HŰӑ̟H�H�O$ᲜeY���vɛ|�Dֳ�0�>�����J���_	2����Bwa���!���%�/r�p���1��?��b8�*����d8�$��ҧ�Lz�p(�1�LYB�Z�px��q���c@xy��LkT1�ؿ��'��sa��1�H�]ؗ�� ̷Ͽ�3�G����5�f��Gf�p�񯫲��S1�~���"|g9��_nK��z��p�#)
�R��~zY�      r      x������ � �      t   �   x���ˍ1D�T��� �ڎe�c�>�Fݬ�ԧ��	�.EL\�������Z��>L��ʲ��GCj�@<"�KZ�`5b�ҳo������J�ɕU�1��%s飍�`EfJ�,d`���u\�q"��(cU��#ɭg!��a�[�׀�`���(3�c38�����A�;�ZV�Q����=���ͥ���6�<X��<ù嬣�O�08�#w/���ñ�1�|���f����0�� �v�X      v      x������ � �      w      x������ � �      y   �   x���K� ���aF��4��8�KŠ�_ڊ�qSBX�0Pi����Y��"��gZ�����r�����S�9|��\h*�hIM`-��ݔ#���˜Hx�X�-�%	�X⮣(���o��4���2E�~i��Gk��49Ls���/�ޡS��K1׋Rj��o       �   �  x��XKn7\?�B0�_~��&��#�����S�b馭D��<[�VU������7�	�������w�_���Ӈw_���獩�y{�:X�W�^�=�8X�u��� ��uaJ!B�ҙ��T�5DA,u8u��2>��Ndj��X
I
)�+�u�=q��X�h����:�̃��*�hc 
cR�2C:X��Ш5޿��e<~�=�A��eD��Q\���Z}�OF�2�~�=%�D:i"
cV���5�dXI��V�4�=�EA,c��1�Q�5n��(�y��fi܍j]T��/
b��u���nqcXHZyمU9��teڿ�(��"i����x����:h��b ���&N�a��F��e_�F�t�@��u����FC:+� ��\X��� �*}4C�f����U*�H�QL�iO'���2�tEӵ��ɛN?$�T���Թ���f|HT/d�DĔ��-(�u���yXKm�Q���+����t�A��iZĔ��-(�D� ��E��)}A� ?-&��Fn ��M���o�R'}Aф��Z��v����o�Т �B���6"J7�����s�G,u���:�W#�����(���k�h�z��qn��mh��(�E@F����d�n��)���j��[t!+M��Ylo�EAL���l���ȭ�}*ODAL�غDh���g6 ]$�O>�))�e���+N����2��/
bڊ]������
���^}Ŵ�3^���A^�󰽽1Ŗ/�}A��׎�������;�,kt�pD��Y��{��u����b����VQ<kCej��x�o�O����mz�	��%�wA�R���-_��7f%bDĄ��-����d�_�Č�_��a#���z�&�N�61���
�����:L�
O2��7
bY���:걡J7���i�tC�Ϡ:QH��%w���1����eH�
�֟�	�g��#2��KC�Rg�U���On 4��Ԇ��-
b���cpъ���S,��d:�ݰ��X<��®������WD�?9�b�C�R��@���(o��l�<q���J���"1�7�_c�a楥%Zb9�㬣�W;Ec�?|Qˤ-K����~�=^=����o~������=��;��o�9d�R{��b)�W����n��G�EV�fm�� ��߶���B��X�9�'̲?��Ĭ�7���/��6      �      x������ � �      {   y   x�K�I�J�K)�/(JL�70qH�M���K���T1�T14R��H+�t�2ML��
���2�*.5�ɮ*�)�ʎ
�2���7/2�N��3w�4/��4202�50�54Q04�2��21����� ]!�      |      x������ � �      ~   �   x�U�A
�0E�3��	$Ѩ�eA�J�v�bB���ɤZ������fg�Z���eD�A!1�������xLn8j��(Ě%�J�����f4����q�h�c�^�u��A�ݼڗ9h)���k�&������WF2      �   &  x��XMo�6=K��G/j������FZ�A]�i�W�ʌ%qKJn���s�!�-W��>RK9��AQ����h���̛�s�FSBr�\���)%��O�=ݦ�;�Y�=��$9�8���&��]�#qJx�hJ�TR��B��f�")��PSg=]��s�ф���R�e���m�_���}�8�~�?��V�+�m�;����4v�J&cJ��R�n�;C��!�2��o��:��l���"
�`~�-��9	��pu��K�o�6�e<�bǷ���)O���x,l�;
�o�"�z��S���0�����w�H���u	�t����&����c���ҽ�3�/�w���$�l��a0�˜%�]�\�7V6W�F��7$�,���cH2�U����`
����>�Zh�G��g�Wn���y�����H�M�qٚ�5��  �,.B��2�;!ʣ~�+T�b%E�.�y�<l&�ӎRH��=���%��0%��3� ;WC�w�f�_^x�p��k�46�}e|m���;�M��������"n8���UK?��jd�'4���ŭ�%t� ��d4�9H-������aK�������jG���s���)ZJ�F�"��	<!�J���:�+��g�(;%{&w,G��*�T�Q��0�c�?p�ݓ���ٲ-4�y��u�%xtE� |OQ}'a�G��yFM�	���)�,4��*�	��>A�5ǒ� -ߟXM��6�P�E�g�	�p�D�n��w�,���B�K��@c�
9m1�4?7hhM������G����t�Kv�����H�9��U�!{?�-������-�(����CmBS��\S�y$��S�ɤz��X��l\�-$}m^��=L��o�Ho�lb]�
�"��Ά���6���J��DӈW��C��P�7,�!z�kS��.nr2��"}x��,c��DeB@;���l|�@��Q���z���n
9s���/{��q��)k�4��5Pc�����Ja���CY�Ñ�mo��qs��W����9yvĆ��c�A|`VCS�TD��U��͠�ﴔBa�-G�����?!=Lk�H�j����Rf��Wu���ٻ�9ԝ2u�a8]��m��$��6�K�&�e��;�&��'�a�$vnUN��^S�Ì��kU����e���� �w� �3�L�����[T�B�W��2��EX�U�����#e���Ӣ&��:Q����0���܄�OA�{L��(�A9>�~�I'~��m�1w���Z��$�x4���������P����B7>�f�l�}�/虗R����Z���j�n���E�k�C�h_ԡ���
�7��g�����3w�p��?��^�\?��|%v*P��\Ԋl�KٻRy�$��n����_��7��/F�l�o�~�!��yf��/�6;�y�oOXZ�UE�Z�<�<X̳���"��y�����췍�K�E�#��k��n�Υ�C��Ӕb7�K�j��,E�H���ˍ5���fT�UG���p�!~Ft�[��9��3[������(��      �     x�%�Ao�@���+��^�B�� j[�Z@1^]@��������L��M&s��~C�YK��n�-J���k{�v4���ia��Z�
RS�N��B������%?������Or�ũ}A����LX^���H<~b���F��2�Rc�X��s��K�#x�,>>1�l�����pb�b�&��Z�E��a��E z�1����z�Ӑ����e���k��׍ˎ��d�Ϝ/�\��/��C�Ϫ�>�F��*�á�f����n4UU� ?�]�      �   �  x��V9��0��W�f��x=�/�d0v`�pd��.j��ȡmA��F��T}�bǎ\y+�q`�����5������ý��ŉSGz��;�jʝ��Wx�+�;��һ���^�790;��""��.���wO.��or���v��鉏��{qeR�=�
O_x�=�8�kj� d��+�ئ��5 �[�ơ�ՐvLfT�xtOv��>�%���9r�Q���d�y��2C�W3j0D�06�Ura����fvt�e�R�:v�G�ߐ�O|j������������FZ%׭���F�ԑ=R�N�r��B�x��B�=�D�	�%~k̆Ax�̗9�$���4��'i\Ϳ��@�Ye��A@�X�5}&|�3}\糬`�4bRY=ƙ�#�lUA�4`�5`���N!^^8#�㨽*zS�1��T�v���ڌ��!�:,U	5D/a6T'HӸ��'��*ua��a�]�'慧Cu�5�d9������^��}�Ӫ�E��b��-g���V-��Bc�e�S��j���Ւ�t��`hw�+���t�NI5�j#ƕ�۪�?�4)��/j������."#Qi��{��%�_�b*��/���(�B;�U��a��ⶹ����[|� _1��g	����k���?T��+���o��?�{�      �      x������ � �      �     x��X�r�:\�_��]&2 �E�"��X~�NR�j�e*�(���o�2�,����~l����T�$�)WlF�F�O�>�Y7%E�4)h8��[��dX���\�X�k֧տ	��Bt4����U���2,#���zxsT-_EV���UY�C�榚��(;�3m(�&7B�@&$�Nm,\LAɌ'�e�����y&BB���K���J���bL��lf!�y9k6iA3�;��Q6.&Lr�_s�Zđ[*ي�.5!�I/������΅�	�W��vC�ê	y1��CS��*P=[}��%Ӛ;�hs��ʪ.�lMF�L��_Vu]��&�F�ESE*z]Q&��WO�$��ͬ��~���,�I�y�9'B�m�]p�I+gd���I��Ա�qF�e-�H�?�dބ�GJ�b�����0'.M���Y�{��4WJ���PŬ�vk�V_E}C��A
Q�+ȴr�TR�a����b�	VQ�����g+�� ����'i��Yk�|"�S�C�$rFh��F��4�9��lL"�XY"i_ʉ�[�12�k�9拾R��b 3�IH'�DJ�a�y��ŰG�^}��U3#�#N��%��^X����*ڛp	���t։�:��ouV�`"��AUaV��3&l���!�tN��N���x��i
��k�]�Q0�H�-�bnt���(�̫ eVHJb��b��9�Rgfò���n���WZZ��[H�,Ct�d7UI�6��C�?������2�G���|z]������|pv{�;����zg;B��VG5�{���X�?�7;
�����|��m�dT1�$lȸSvJ�B+��݄��zU���Ò�uV�&k�rɊa�Vo�z6�T���d&aXW��0!�Ea��8��1or�!&g�1�&�l.B���8�S��,'�-b��X���8QNH(���橇��8V&2�l$�|�e8/�^�n�5�*#��#�b����|�%�Pݶ�:�E$�)N�
&�!�ۂ���j]?�o�馪֧�S
�qֆT	�}���)R�\���I"��N��j�����2KP�c�"a�d��A�*P�\ƕ+�5�C�	D�!6gǸ_�
�j�U�$66�j�xv5�����x�(������& @
'�(�:dU�	M��|�
� 
�R�^eHg�����vx'��E�S���8I�J��ÄT,`�N�A|J��4E�
�����)e��6�"��$�Qw�ա��i��?���Gտ�<yo�"@E�0ˋY����%�m�h�z��|�7�<ܫ�%u��z��YwzڽwGYǟ��M�Ow{Uyx��:�z��K^(֯�YB�9��YŸ}��?b���;�I����qo����u���bS|����Gޟwwow�>%��*r�Cߋ���2��N.ǝ�6[ܮqkv0�2z�{���1������g~z,�A_�=X�8�;O����v�vǧ�q9��|qk�f���P,v�o���,����my.�7���O���%涸[�7l�&�9��*��v�	3ȄR*�g]�U�R�	�~'�*j��ۊ�"��y�����?�Q�fHm�x=��
4װ\o�+�B�s�u�|�k�1*N*�T�\�g��
��l��D�8�9�����Z󅵐N�.m\��9�n��ٺ�L²aaҺb4rպ��?d�	���>��A�#���ahV�A���2!�l����8t&��"�D?�C��,E����p�<��d_�+�Zc,]���p.�?{����0���������3^���ոA�3<1���v��V���=-p��N3[}Y OJ�[׳Z��4y\���kt��R���BvK�!���3�h.��q'�T3C�*�7)B\��̆`��Y���0[�#@&�3ɳ���9���9�4M�?�y�����9����p~��S�^�����\��~�������v�yN���fqr^MgIף_nɎ���T2��Va9zt��HC=��c)zVM��e%�P~��#�&���/�:t~�[]L���w�U�?_^��W�^����|~A=H����ՖҭH�� 3�iM�^"��t��P��N��D���2zZ4m�p��6N:��p�/.1�ܪ�����d~������'��v���fb�X��:��}m��?��.�ZG5�� 4@ߎ;(�c��6I����QB}�vAg*���G��G����������[�B�yrbu{tu��ǟ�Ϛx08Hw�b|T�cزUɼ~JrMt0����Q��+dT���u���btY�.��	��P����K7���*	�'kI�/�5�	;���p��#� �{�oc�BH��8Y}�s�d�����",��X�c��E����@,_�X>"�����h{����.B��6ձV��4@�UY���KH�,26m�v���@�a��P�6���4� p�mD��*U6v29}��}B��Ha
'̯�u������c��>��z���P���	&��pj����QG�EF���1^}�O�|}��1��Ě��Nc�/p���;L�S��rݘ瘅�~��:ah�J?��P/0��h�I*a�O,�K;u������2i� j��Q6�ih���ĸ)%�;u�.kZ &|�u���/�ʊ%[�kә�/����:P4@B�B�X�<1w��U��uF\o��m2gj���89)���4	���ے�ߜ6����p0B�٫�����;��P�E�9o�ȍտ����Sq�%D�A����������T�����wwӊoo/����]/Y(I��vxt���<��ߔ����r����������     