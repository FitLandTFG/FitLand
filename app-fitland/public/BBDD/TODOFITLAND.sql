--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-25 16:25:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 878 (class 1247 OID 18200)
-- Name: estadopago_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estadopago_enum AS ENUM (
    'pendiente',
    'completado',
    'fallido'
);


ALTER TYPE public.estadopago_enum OWNER TO postgres;

--
-- TOC entry 881 (class 1247 OID 18208)
-- Name: rolesusuarios_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rolesusuarios_enum AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.rolesusuarios_enum OWNER TO postgres;

--
-- TOC entry 884 (class 1247 OID 18214)
-- Name: tipoplansuscripcion_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipoplansuscripcion_enum AS ENUM (
    'Prueba',
    'Silver',
    'Gold',
    'Diamond'
);


ALTER TYPE public.tipoplansuscripcion_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 18223)
-- Name: cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18228)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18233)
-- Name: clases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clases (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    horario timestamp without time zone NOT NULL,
    aforo smallint NOT NULL,
    updated_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.clases OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18236)
-- Name: clases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clases_id_seq OWNER TO postgres;

--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 220
-- Name: clases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clases_id_seq OWNED BY public.clases.id;


--
-- TOC entry 245 (class 1259 OID 18453)
-- Name: compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    fecha_compra date DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.compras OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 18452)
-- Name: compras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compras_id_seq OWNER TO postgres;

--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 244
-- Name: compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;


--
-- TOC entry 247 (class 1259 OID 18466)
-- Name: detalle_compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_compras (
    id integer NOT NULL,
    compra_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.detalle_compras OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 18465)
-- Name: detalle_compras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_compras_id_seq OWNER TO postgres;

--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 246
-- Name: detalle_compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_compras_id_seq OWNED BY public.detalle_compras.id;


--
-- TOC entry 221 (class 1259 OID 18241)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18247)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 222
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 223 (class 1259 OID 18248)
-- Name: inscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscripciones (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    clase_id integer NOT NULL,
    fecha_inscripcion date,
    updated_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.inscripciones OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18251)
-- Name: inscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inscripciones_id_seq OWNER TO postgres;

--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 224
-- Name: inscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inscripciones_id_seq OWNED BY public.inscripciones.id;


--
-- TOC entry 225 (class 1259 OID 18252)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_batches (
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


ALTER TABLE public.job_batches OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 18257)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18262)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 228 (class 1259 OID 18263)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18266)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 229
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 249 (class 1259 OID 18484)
-- Name: pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    compra_id integer NOT NULL,
    metodo_pago character varying(50) NOT NULL,
    estado public.estadopago_enum DEFAULT 'pendiente'::public.estadopago_enum,
    monto double precision NOT NULL,
    transaccion_id character varying(100),
    fecha_pago timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.pagos OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 18483)
-- Name: pagos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagos_id_seq OWNER TO postgres;

--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 248
-- Name: pagos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;


--
-- TOC entry 230 (class 1259 OID 18273)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 18278)
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_access_tokens (
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


ALTER TABLE public.personal_access_tokens OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 18283)
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 232
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- TOC entry 233 (class 1259 OID 18284)
-- Name: planes_suscripcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planes_suscripcion (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    precio double precision NOT NULL,
    tipo public.tipoplansuscripcion_enum NOT NULL,
    duracion_dias smallint NOT NULL
);


ALTER TABLE public.planes_suscripcion OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 18287)
-- Name: planes_suscripcion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planes_suscripcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planes_suscripcion_id_seq OWNER TO postgres;

--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 234
-- Name: planes_suscripcion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planes_suscripcion_id_seq OWNED BY public.planes_suscripcion.id;


--
-- TOC entry 235 (class 1259 OID 18288)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
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


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 18294)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 236
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 237 (class 1259 OID 18295)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 18300)
-- Name: suscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscripciones (
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


ALTER TABLE public.suscripciones OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 18304)
-- Name: suscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suscripciones_id_seq OWNER TO postgres;

--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 239
-- Name: suscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscripciones_id_seq OWNED BY public.suscripciones.id;


--
-- TOC entry 240 (class 1259 OID 18305)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 18310)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 242 (class 1259 OID 18311)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying(50) NOT NULL,
    documentacion character varying(9) NOT NULL,
    domicilio character varying(150) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    imagen text NOT NULL,
    roles public.rolesusuarios_enum DEFAULT 'user'::public.rolesusuarios_enum,
    email_verified_at timestamp without time zone,
    remember_token character varying(100)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 18317)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 243
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4735 (class 2604 OID 18318)
-- Name: clases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clases ALTER COLUMN id SET DEFAULT nextval('public.clases_id_seq'::regclass);


--
-- TOC entry 4750 (class 2604 OID 18456)
-- Name: compras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 18469)
-- Name: detalle_compras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_compras ALTER COLUMN id SET DEFAULT nextval('public.detalle_compras_id_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 18320)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 4738 (class 2604 OID 18321)
-- Name: inscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones ALTER COLUMN id SET DEFAULT nextval('public.inscripciones_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 18322)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 18323)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4754 (class 2604 OID 18487)
-- Name: pagos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 18325)
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 18326)
-- Name: planes_suscripcion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_suscripcion ALTER COLUMN id SET DEFAULT nextval('public.planes_suscripcion_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 18327)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 18328)
-- Name: suscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones ALTER COLUMN id SET DEFAULT nextval('public.suscripciones_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 18329)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 18330)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4961 (class 0 OID 18223)
-- Dependencies: 217
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache (key, value, expiration) FROM stdin;
laravel_cache_fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f:timer	i:1745182963;	1745182963
laravel_cache_fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f	i:2;	1745182963
laravel_cache_safvrsfsesght@gmail.com|127.0.0.1:timer	i:1745191097;	1745191097
laravel_cache_safvrsfsesght@gmail.com|127.0.0.1	i:1;	1745191097
laravel_cache_b1d5781111d84f7b3fe45a0852e59758cd7a87e5:timer	i:1745194242;	1745194242
laravel_cache_b1d5781111d84f7b3fe45a0852e59758cd7a87e5	i:1;	1745194242
laravel_cache_17ba0791499db908433b80f37c5fbc89b870084b:timer	i:1745194351;	1745194351
laravel_cache_17ba0791499db908433b80f37c5fbc89b870084b	i:1;	1745194351
laravel_cache_cuentawamp@gmail.com12345678|127.0.0.1:timer	i:1745629610;	1745629610
laravel_cache_cuentawamp@gmail.com12345678|127.0.0.1	i:1;	1745629610
laravel_cache_ceuntawamp@gmail.com|127.0.0.1:timer	i:1746728075;	1746728075
laravel_cache_ceuntawamp@gmail.com|127.0.0.1	i:1;	1746728075
laravel_cache_8ee51caaa2c2f4ee2e5b4b7ef5a89db7df1068d7:timer	i:1747814745;	1747814745
laravel_cache_8ee51caaa2c2f4ee2e5b4b7ef5a89db7df1068d7	i:1;	1747814745
\.


--
-- TOC entry 4962 (class 0 OID 18228)
-- Dependencies: 218
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 4963 (class 0 OID 18233)
-- Dependencies: 219
-- Data for Name: clases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clases (id, nombre, horario, aforo, updated_at, created_at) FROM stdin;
1	Zumba	2025-06-02 08:00:00	20	\N	\N
2	Pilates	2025-06-02 09:20:00	18	\N	\N
3	GAP	2025-06-02 10:40:00	15	\N	\N
4	HIIT	2025-06-02 12:00:00	16	\N	\N
5	Full Body Workout	2025-06-02 13:20:00	18	\N	\N
6	Cardio Dance	2025-06-02 14:40:00	22	\N	\N
7	Stretching	2025-06-02 16:00:00	12	\N	\N
8	Entrenamiento Funcional	2025-06-02 17:20:00	20	\N	\N
9	Boxeo	2025-06-02 18:40:00	14	\N	\N
10	Kickboxing	2025-06-02 20:00:00	12	\N	\N
11	Zumba	2025-06-03 08:00:00	20	\N	\N
12	Pilates	2025-06-03 09:20:00	18	\N	\N
13	GAP	2025-06-03 10:40:00	15	\N	\N
14	HIIT	2025-06-03 12:00:00	16	\N	\N
15	Full Body Workout	2025-06-03 13:20:00	18	\N	\N
16	Cardio Dance	2025-06-03 14:40:00	22	\N	\N
17	Stretching	2025-06-03 16:00:00	12	\N	\N
18	Entrenamiento Funcional	2025-06-03 17:20:00	20	\N	\N
19	Boxeo	2025-06-03 18:40:00	14	\N	\N
20	Kickboxing	2025-06-03 20:00:00	12	\N	\N
21	Zumba	2025-06-04 08:00:00	20	\N	\N
22	Pilates	2025-06-04 09:20:00	18	\N	\N
23	GAP	2025-06-04 10:40:00	15	\N	\N
24	HIIT	2025-06-04 12:00:00	16	\N	\N
25	Full Body Workout	2025-06-04 13:20:00	18	\N	\N
26	Cardio Dance	2025-06-04 14:40:00	22	\N	\N
27	Stretching	2025-06-04 16:00:00	12	\N	\N
28	Entrenamiento Funcional	2025-06-04 17:20:00	20	\N	\N
29	Boxeo	2025-06-04 18:40:00	14	\N	\N
30	Kickboxing	2025-06-04 20:00:00	12	\N	\N
31	Zumba	2025-06-05 08:00:00	20	\N	\N
32	Pilates	2025-06-05 09:20:00	18	\N	\N
33	GAP	2025-06-05 10:40:00	15	\N	\N
34	HIIT	2025-06-05 12:00:00	16	\N	\N
35	Full Body Workout	2025-06-05 13:20:00	18	\N	\N
36	Cardio Dance	2025-06-05 14:40:00	22	\N	\N
37	Stretching	2025-06-05 16:00:00	12	\N	\N
38	Entrenamiento Funcional	2025-06-05 17:20:00	20	\N	\N
39	Boxeo	2025-06-05 18:40:00	14	\N	\N
40	Kickboxing	2025-06-05 20:00:00	12	\N	\N
41	Zumba	2025-06-06 08:00:00	20	\N	\N
42	Pilates	2025-06-06 09:20:00	18	\N	\N
43	GAP	2025-06-06 10:40:00	15	\N	\N
44	HIIT	2025-06-06 12:00:00	16	\N	\N
45	Full Body Workout	2025-06-06 13:20:00	18	\N	\N
46	Cardio Dance	2025-06-06 14:40:00	22	\N	\N
47	Stretching	2025-06-06 16:00:00	12	\N	\N
48	Entrenamiento Funcional	2025-06-06 17:20:00	20	\N	\N
49	Boxeo	2025-06-06 18:40:00	14	\N	\N
50	Kickboxing	2025-06-06 20:00:00	12	\N	\N
51	Zumba	2025-06-07 08:00:00	20	\N	\N
52	Pilates	2025-06-07 09:20:00	18	\N	\N
53	GAP	2025-06-07 10:40:00	15	\N	\N
54	HIIT	2025-06-07 12:00:00	16	\N	\N
55	Full Body Workout	2025-06-07 13:20:00	18	\N	\N
56	Cardio Dance	2025-06-07 14:40:00	22	\N	\N
57	Stretching	2025-06-07 16:00:00	12	\N	\N
58	Entrenamiento Funcional	2025-06-07 17:20:00	20	\N	\N
59	Boxeo	2025-06-07 18:40:00	14	\N	\N
60	Kickboxing	2025-06-07 20:00:00	12	\N	\N
61	Zumba	2025-06-08 08:00:00	20	\N	\N
62	Pilates	2025-06-08 09:20:00	18	\N	\N
63	GAP	2025-06-08 10:40:00	15	\N	\N
64	HIIT	2025-06-08 12:00:00	16	\N	\N
65	Full Body Workout	2025-06-08 13:20:00	18	\N	\N
66	Cardio Dance	2025-06-08 14:40:00	22	\N	\N
67	Stretching	2025-06-08 16:00:00	12	\N	\N
68	Entrenamiento Funcional	2025-06-08 17:20:00	20	\N	\N
69	Boxeo	2025-06-08 18:40:00	14	\N	\N
70	Kickboxing	2025-06-08 20:00:00	12	\N	\N
\.


--
-- TOC entry 4989 (class 0 OID 18453)
-- Dependencies: 245
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras (id, usuario_id, fecha_compra, created_at, updated_at) FROM stdin;
1	2	2025-05-22	2025-05-22 21:29:04	2025-05-22 21:29:04
\.


--
-- TOC entry 4991 (class 0 OID 18466)
-- Dependencies: 247
-- Data for Name: detalle_compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_compras (id, compra_id, producto_id, cantidad, created_at, updated_at) FROM stdin;
4	1	1	41	2025-05-22 21:29:24	2025-05-22 21:29:24
5	1	4	16	2025-05-22 21:29:24	2025-05-22 21:29:24
6	1	1	10	2025-05-22 21:29:24	2025-05-22 21:29:24
7	1	6	1	2025-05-22 21:29:24	2025-05-22 21:29:24
\.


--
-- TOC entry 4965 (class 0 OID 18241)
-- Dependencies: 221
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 4967 (class 0 OID 18248)
-- Dependencies: 223
-- Data for Name: inscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscripciones (id, usuario_id, clase_id, fecha_inscripcion, updated_at, created_at) FROM stdin;
\.


--
-- TOC entry 4969 (class 0 OID 18252)
-- Dependencies: 225
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 4970 (class 0 OID 18257)
-- Dependencies: 226
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 4972 (class 0 OID 18263)
-- Dependencies: 228
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_04_10_155215_create_personal_access_tokens_table	1
5	2025_04_16_151645_add_remember_token_to_usuarios_table	2
\.


--
-- TOC entry 4993 (class 0 OID 18484)
-- Dependencies: 249
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagos (id, usuario_id, compra_id, metodo_pago, estado, monto, transaccion_id, fecha_pago, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4974 (class 0 OID 18273)
-- Dependencies: 230
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
alejandroprado04@gmail.com	$2y$12$MHfv9EUZ5acxjS88j7Qjsu1lkzplvPZkZSJ4LHo7r5Kgn.7EY3WtO	2025-04-14 17:19:41
\.


--
-- TOC entry 4975 (class 0 OID 18278)
-- Dependencies: 231
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4977 (class 0 OID 18284)
-- Dependencies: 233
-- Data for Name: planes_suscripcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planes_suscripcion (id, nombre, precio, tipo, duracion_dias) FROM stdin;
1	Silver Mensual	9.99	Silver	30
2	Silver Anual	99.99	Silver	365
3	Gold Mensual	14.99	Gold	30
4	Gold Anual	149.99	Gold	365
5	Diamond Mensual	19.99	Diamond	30
7	Plan prueba	120	Prueba	120
6	Diamond Anual	199.99	Diamond	365
\.


--
-- TOC entry 4979 (class 0 OID 18288)
-- Dependencies: 235
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, tipo, nombre, descripcion, precio, imagen, created_at, updated_at, stock) FROM stdin;
1	ropa	Camiseta técnica (S)	Camiseta deportiva transpirable y ligera, talla S.	12.99	https://via.placeholder.com/100x100?text=Camiseta+S	\N	\N	20
2	ropa	Camiseta técnica (M)	Camiseta deportiva transpirable y ligera, talla M.	12.99	https://via.placeholder.com/100x100?text=Camiseta+M	\N	\N	25
3	ropa	Camiseta técnica (L)	Camiseta deportiva transpirable y ligera, talla L.	12.99	https://via.placeholder.com/100x100?text=Camiseta+L	\N	\N	25
4	ropa	Camiseta técnica (XL)	Camiseta deportiva transpirable y ligera, talla XL.	12.99	https://via.placeholder.com/100x100?text=Camiseta+XL	\N	\N	15
5	ropa	Sudadera (S)	Sudadera cómoda con capucha, ideal para después del gym.	24.99	https://via.placeholder.com/100x100?text=Sudadera+S	\N	\N	10
6	ropa	Sudadera (M)	Sudadera cómoda con capucha, ideal para después del gym.	24.99	https://via.placeholder.com/100x100?text=Sudadera+M	\N	\N	12
7	ropa	Sudadera (XL)	Sudadera cómoda con capucha, ideal para después del gym.	24.99	https://via.placeholder.com/100x100?text=Sudadera+XL	\N	\N	8
8	ropa	Mochila deportiva	Mochila ligera y resistente con compartimentos útiles.	19.99	https://via.placeholder.com/100x100?text=Mochila	\N	\N	18
9	suplemento	Proteína Whey (chocolate)	Proteína de suero sabor chocolate (1 kg), ideal para recuperación post-entreno.	29.99	https://via.placeholder.com/100x100?text=Whey+Chocolate	\N	\N	30
10	suplemento	Proteína Whey (vainilla)	Proteína de suero sabor vainilla (1 kg), fácil digestión y alto valor biológico.	29.99	https://via.placeholder.com/100x100?text=Whey+Vainilla	\N	\N	25
11	suplemento	Proteína vegetal (veganos)	Mezcla vegetal sin lactosa (1 kg), perfecta para dietas veganas o intolerancias.	31.99	https://via.placeholder.com/100x100?text=Vegana	\N	\N	20
12	suplemento	Pre-entreno en polvo (cafeína + beta-A)	Pre-workout con cafeína y beta-alanina (300 g) para energía y enfoque.	19.99	https://via.placeholder.com/100x100?text=Pre+Workout	\N	\N	18
13	suplemento	Creatina monohidrato	Creatina pura monohidrato (500 g) para mejorar fuerza y rendimiento.	16.99	https://via.placeholder.com/100x100?text=Creatina	\N	\N	40
14	suplemento	Multivitamínicos deportivos	Complejo vitamínico en cápsulas (90 uds) para atletas y deportistas.	12.49	https://via.placeholder.com/100x100?text=Vitaminas	\N	\N	15
15	suplemento	Barritas proteicas (chocolate/frutos)	Barrita proteica de 60 g ideal para snack post-entreno o media mañana.	2.99	https://via.placeholder.com/100x100?text=Barrita	\N	\N	50
16	suplemento	Galletas proteicas	Galleta proteica gourmet de 75 g, alta en proteína y sabor.	3.49	https://via.placeholder.com/100x100?text=Galleta	\N	\N	20
17	bebida	Agua mineral (500 ml)	Botella de agua natural (500 ml), ideal para hidratarse durante el entreno.	0.99	https://via.placeholder.com/100x100?text=Agua+500ml	\N	\N	50
18	bebida	Agua mineral (1,5 L)	Botella grande de agua mineral (1,5 L) para sesiones largas o días calurosos.	1.49	https://via.placeholder.com/100x100?text=Agua+1.5L	\N	\N	30
19	bebida	Bebida isotónica (500 ml)	Bebida deportiva (500 ml) con electrolitos para una rápida rehidratación.	1.79	https://via.placeholder.com/100x100?text=Isotonica	\N	\N	40
20	bebida	Bebida energética (500 ml)	Lata energética (500 ml) con cafeína, ideal para mejorar el enfoque.	2.2	https://via.placeholder.com/100x100?text=Energetica	\N	\N	35
21	bebida	Zumo natural (330 ml)	Zumo natural de frutas (330 ml), sin azúcares añadidos, refrescante y sano.	1.6	https://via.placeholder.com/100x100?text=Zumo	\N	\N	25
22	bebida	Agua con gas saborizada (330 ml)	Lata de agua con gas saborizada (330 ml), alternativa sin azúcar al refresco.	1.2	https://via.placeholder.com/100x100?text=Agua+Saborizada	\N	\N	28
23	accesorio	Guantes de entrenamiento	Guantes acolchados para proteger las manos al usar mancuernas y barras.	14.99	https://via.placeholder.com/100x100?text=Guantes	\N	\N	20
24	accesorio	Vendas para boxeo	Vendas elásticas (2,5 m) para proteger muñecas y nudillos.	7.99	https://via.placeholder.com/100x100?text=Vendas	\N	\N	30
25	accesorio	Botella reutilizable	Botella de 750 ml con cierre hermético, ideal para entrenamientos largos.	9.99	https://via.placeholder.com/100x100?text=Botella	\N	\N	25
26	accesorio	Esterilla de yoga	Esterilla antideslizante de 180×60 cm, perfecta para yoga o estiramientos.	17.99	https://via.placeholder.com/100x100?text=Esterilla	\N	\N	15
27	accesorio	Toalla de microfibra	Toalla ligera y absorbente, ideal para entreno o duchas rápidas.	5.99	https://via.placeholder.com/100x100?text=Toalla	\N	\N	40
28	accesorio	Comba de velocidad	Cuerda ajustable con rodamientos para entrenamientos de cardio o boxeo.	8.49	https://via.placeholder.com/100x100?text=Comba	\N	\N	18
29	accesorio	Mancuerna	Mancuerna 20kg	10.99	https://via.placeholder.com/100x100?text=Mancuerna	2025-05-22 21:26:30	2025-05-22 21:26:30	14
\.


--
-- TOC entry 4981 (class 0 OID 18295)
-- Dependencies: 237
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
E1qdjvcqzC1Tgyxsf8int1CABxEwWfEYy7M0NDWN	1	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0	YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMWw0YThoR0ZDN2MwR2ZsQmV5azNZMTB5Wm4wMjZDUzFLYmF4RWFQdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hZG1pbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=	1747942658
\.


--
-- TOC entry 4982 (class 0 OID 18300)
-- Dependencies: 238
-- Data for Name: suscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suscripciones (id, usuario_id, plan_id, precio, fecha_inicio, fecha_fin, estado, created_at, updated_at) FROM stdin;
2	2	1	9.99	2025-04-14	2025-05-14	activa	\N	\N
3	3	4	149.99	2025-02-13	2025-03-15	activa	\N	\N
4	4	2	99.99	2025-02-11	2025-03-13	activa	\N	\N
5	5	4	149.99	2025-04-28	2025-05-28	activa	\N	\N
6	6	5	19.99	2025-03-02	2025-04-01	activa	\N	\N
7	7	4	149.99	2025-04-11	2025-05-11	activa	\N	\N
8	8	3	14.99	2025-03-12	2025-04-11	activa	\N	\N
9	9	4	149.99	2025-02-19	2025-03-21	activa	\N	\N
10	10	2	99.99	2025-03-27	2025-04-26	activa	\N	\N
11	11	2	99.99	2025-04-04	2025-05-04	activa	\N	\N
12	12	2	99.99	2025-05-04	2026-05-04	activa	2025-05-12 20:35:07	2025-05-13 20:51:03
13	13	7	120	2025-09-30	2025-10-30	activa	2025-05-13 21:31:19	2025-05-13 21:31:19
14	1	6	199.99	2025-05-22	2026-05-22	activa	2025-05-22 21:16:57	2025-05-22 21:16:57
1	1	2	99.99	2025-04-01	2026-04-01	cancelada	\N	2025-05-22 21:17:18
\.


--
-- TOC entry 4984 (class 0 OID 18305)
-- Dependencies: 240
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4986 (class 0 OID 18311)
-- Dependencies: 242
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre_completo, documentacion, domicilio, email, password, imagen, roles, email_verified_at, remember_token) FROM stdin;
3	Adelaida Paniagua Armengol	83057326W	Cañada de Lucía González 59, Badajoz, 75625	ccolomer@hotmail.com	56aef6f6111ea6e995b73183ae42d09e8ddcc0a747fd1e9af230896f60e6b27f	/images/defaults/avatar.jpg	admin	2025-05-13 21:49:36	c20b8b6e3cda2c14871c68565588e38144876477
4	Josefina Chaparro Martínez	55085956J	Glorieta de Albina Torrijos 157 Piso 4 , Valencia, 09305	hagustin@gmail.com	6cdb29ef0954a881edc7d2020c5a54862397d828d82f253453da57318d14aa1b	/images/defaults/avatar.jpg	user	2025-05-13 21:49:44	6042dd864fe0570a0263b8bfebfd9fc6b5bf4442
5	Juanito Francisco Carrasco Ibañez	71465572H	Cañada de Lorenzo Vizcaíno 99, Murcia, 68644	clementina22@gmail.com	bd0a8743578c919a16cae714e2aa8615ce0606261cbb35fe71d73a1e0347aa27	/images/defaults/avatar.jpg	user	2025-05-13 21:50:18	a67c50d8cc28724a5eca3a226b6b4da5a7309222
6	Rodrigo Mascaró Costa	30590713T	Cuesta Martirio Guerra 164 Apt. 40 , Córdoba, 89671	loreto39@gmail.com	7b4470efd5faf67843c7f5a0988afbb020ecf50c89c1e9f1b97c71e93065b8a6	/images/defaults/avatar.jpg	user	2025-05-13 21:50:25	dc4e18ad712a4e1493c49ad3c9101e91a82395d6
7	hsidhis	X4527788K	Calle Real	hola@gmail.com	$2y$12$fmNHWF46qL1Av00pWllBMOGMRMQqwBJVnUBiYBQE11giv54Ln4pcG	/images/defaults/avatar.jpg	user	2025-05-13 21:50:31	\N
8	Leocadia Ríos Asenjo	58211168P	Pasaje de Desiderio Boada 4 Apt. 26 , León, 68602	igimeno@ortuno-montenegro.es	113a117e0208c3b2af2c6f75a3a86945586ab9ea7f1ef71e57b4d93ca3b7dfa4	/images/defaults/avatar.jpg	user	2025-05-13 21:49:13	524a0f17983948127247797fbcc50b3346e6a6a9
9	Régulo Montaña Moraleda	91891021H	Plaza de Azahara Arregui 25 Apt. 85 , Cantabria, 44864	salome30@yahoo.com	fabe05877eb4125cd5ec5b0e24f02a264ff99121285597509ee3fe91622d9896	/images/defaults/avatar.jpg	admin	2025-05-13 21:49:19	a9de63e19894eab88d047272f76f8995eaa91911
10	Natalia Ros	74669736Y	Cuesta de Ildefonso Navas 10 Apt. 25 , Girona, 21639	wilfredofernandez@yahoo.com	a1e626e8c3a5214f7aa6a5d5d9fb4f0c23089521ea2f1dcb34520d975964bec0	/images/defaults/avatar.jpg	admin	2025-05-13 21:49:24	e27281d5fcba4c0bbc91f4712beace8bbadc0184
13	Leonel Andres Messi Cuccitini	10101010M	Calle Buenos Aires	fitlandtfg@gmail.com	$2y$12$d/ajEWGB8csGtTJGriz0j.NVBSiwQApPASeSwLd.cQmUnyPFBolJy	/images/defaults/avatar.jpg	user	2025-05-13 21:25:01	\N
14	Cristiano Ronaldo	07070707C	Calle portugal	cristiano7@gmail.com	$2y$12$/3fVwW.OOS/1kBMClwZ0CuAFqFQk9cVoif74vgcB30IMTfDZeOTm.	/images/defaults/avatar.jpg	user	2025-05-13 21:26:07	\N
15	Imanol Kery Medina	X3628899H	calle de las cruces	cuenwamp@gmail.com	$2y$12$doqEr8NPy3ljCkxSq6wA6uUNJ1vFWqI2jN6vdJWoKlR1y/zIy.kdO	/images/defaults/avatar.jpg	admin	2025-05-13 21:48:08	\N
16	Dan Rafael Heredia Barón	65622240C	Acceso Eusebia Tenorio 39 Apt. 08 , Huesca, 26228	maria-del-carmenfabregas@garcia-gutierrez.com	c474ef5f005f4cd4ef1138c324432b26f15e3d8aa521ed613c4a3a9583bcfdfa	/images/defaults/avatar.jpg	user	2025-05-13 21:48:13	047a8e6ff9af668fcc2c056a94939191a7b4df00
17	Macarena Rocío Fortuny Martin	51647436Q	Callejón de Jesús Alegre 2 Apt. 63 , Girona, 88601	diego95@gmail.com	df8dba5e5ccfe30f94f7d6442c4294ea3283fba72888b25cca429ae3d01658ab	/images/defaults/avatar.jpg	admin	2025-05-13 21:48:17	f6426fd626b5d091cb06a8760960854351c371f3
1	Brandon Muzo	59876789K	Calle Libertad 21	cuentawamp@gmail.com	$2y$12$hbAq9gmd4EsYvOOl6DSp9eoFwKlaaJCsPsWXW5hgMjdbaGoJlNzwm	/images/defaults/avatar.jpg	admin	2025-04-21 00:11:31	MXOSrZG3ib6f9EEeO2T3jJ3SwkT4lnYetsfijB9AWH32TXg9MB2BBbLGb5an
11	Xavier Estévez	28097597S	Ronda de Noemí Téllez 43 Piso 3 , Jaén, 31250	emilianamartorell@bolanos.es	6a466a9cb31ab206ff6f6b7c146b5908399fdda620f24f94f5d5ebb9f2458560	/images/defaults/avatar.jpg	user	2025-05-13 21:49:30	YxGeRTblp6bWwgvHi1bWwf5HR0GC9zC2DzcgjwFzfegpA7WhvORopt9Acb41
12	Lamine Yamal	59374859L	calle libertad 21	brandonmuzo15@gmail.com	$2y$12$lZAO0E61isdhBuTHJI.aROFoSnLpPwlViHuzTIgsXV9GfGkTrMExa	/images/defaults/avatar.jpg	user	2025-05-21 10:04:45	\N
2	Alejandro Prado Flórez	47544281S	Calle Montecarlo 7	alejandroprado04@gmail.com	$2y$12$O.nweQ5STbfeIIq4QVxpsOuQ3MeHIyKxO/N7zCdQt1FN50j5Aj.rO	/images/defaults/avatar.jpg	user	\N	\N
\.


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 220
-- Name: clases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clases_id_seq', 71, false);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 244
-- Name: compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_id_seq', 1, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 246
-- Name: detalle_compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_compras_id_seq', 7, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 222
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 224
-- Name: inscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inscripciones_id_seq', 1, false);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 229
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 248
-- Name: pagos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagos_id_seq', 1, false);


--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 232
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 234
-- Name: planes_suscripcion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_suscripcion_id_seq', 8, false);


--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 236
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 29, true);


--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 239
-- Name: suscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscripciones_id_seq', 14, true);


--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 243
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 18, false);


--
-- TOC entry 4762 (class 2606 OID 18332)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 4760 (class 2606 OID 18334)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 4764 (class 2606 OID 18336)
-- Name: clases clases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clases
    ADD CONSTRAINT clases_pkey PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 18459)
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 18472)
-- Name: detalle_compras detalle_compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 18340)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 18342)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 4770 (class 2606 OID 18344)
-- Name: inscripciones inscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 18346)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 18348)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 18350)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 18491)
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);


--
-- TOC entry 4779 (class 2606 OID 18354)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 4781 (class 2606 OID 18356)
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 18358)
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- TOC entry 4786 (class 2606 OID 18360)
-- Name: planes_suscripcion planes_suscripcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_suscripcion
    ADD CONSTRAINT planes_suscripcion_pkey PRIMARY KEY (id);


--
-- TOC entry 4788 (class 2606 OID 18362)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 18364)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 18366)
-- Name: suscripciones suscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 18368)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 4798 (class 2606 OID 18370)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4800 (class 2606 OID 18372)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 1259 OID 18373)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 4784 (class 1259 OID 18374)
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- TOC entry 4789 (class 1259 OID 18375)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 4792 (class 1259 OID 18376)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 4811 (class 2606 OID 18460)
-- Name: compras compras_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4812 (class 2606 OID 18473)
-- Name: detalle_compras detalle_compras_compra_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_compra_id_fkey FOREIGN KEY (compra_id) REFERENCES public.compras(id);


--
-- TOC entry 4813 (class 2606 OID 18478)
-- Name: detalle_compras detalle_compras_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT detalle_compras_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


--
-- TOC entry 4807 (class 2606 OID 18387)
-- Name: inscripciones inscripciones_clase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_clase_id_fkey FOREIGN KEY (clase_id) REFERENCES public.clases(id);


--
-- TOC entry 4808 (class 2606 OID 18392)
-- Name: inscripciones inscripciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4814 (class 2606 OID 18497)
-- Name: pagos pagos_compra_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_compra_id_fkey FOREIGN KEY (compra_id) REFERENCES public.compras(id);


--
-- TOC entry 4815 (class 2606 OID 18492)
-- Name: pagos pagos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4809 (class 2606 OID 18407)
-- Name: suscripciones suscripciones_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.planes_suscripcion(id);


--
-- TOC entry 4810 (class 2606 OID 18412)
-- Name: suscripciones suscripciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


-- Completed on 2025-05-25 16:25:32

--
-- PostgreSQL database dump complete
--

