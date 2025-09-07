--
-- PostgreSQL database dump
--

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.6

-- Started on 2025-09-07 02:39:17 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16394)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 860 (class 1247 OID 16406)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: toby
--

CREATE TYPE public.enum_users_role AS ENUM (
    'student',
    'teacher',
    'admin'
);


ALTER TYPE public.enum_users_role OWNER TO toby;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16389)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO toby;

--
-- TOC entry 218 (class 1259 OID 16569)
-- Name: courses; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.courses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    title character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.courses OWNER TO toby;

--
-- TOC entry 222 (class 1259 OID 16631)
-- Name: files; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.files (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    lesson_id uuid NOT NULL,
    filename character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.files OWNER TO toby;

--
-- TOC entry 219 (class 1259 OID 16586)
-- Name: lessons; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.lessons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    video_url character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.lessons OWNER TO toby;

--
-- TOC entry 220 (class 1259 OID 16599)
-- Name: user_favorites; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.user_favorites (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    course_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_favorites OWNER TO toby;

--
-- TOC entry 221 (class 1259 OID 16615)
-- Name: user_likes; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.user_likes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    lesson_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_likes OWNER TO toby;

--
-- TOC entry 217 (class 1259 OID 16555)
-- Name: users; Type: TABLE; Schema: public; Owner: toby
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'student'::public.enum_users_role NOT NULL,
    theme boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO toby;

--
-- TOC entry 3314 (class 2606 OID 16393)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3320 (class 2606 OID 16578)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3322 (class 2606 OID 16580)
-- Name: courses courses_title_key; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_title_key UNIQUE (title);


--
-- TOC entry 3330 (class 2606 OID 16638)
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- TOC entry 3324 (class 2606 OID 16593)
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- TOC entry 3326 (class 2606 OID 16604)
-- Name: user_favorites user_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_pkey PRIMARY KEY (id);


--
-- TOC entry 3328 (class 2606 OID 16620)
-- Name: user_likes user_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_pkey PRIMARY KEY (id);


--
-- TOC entry 3316 (class 2606 OID 16568)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3318 (class 2606 OID 16566)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3331 (class 2606 OID 16581)
-- Name: courses courses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3337 (class 2606 OID 16639)
-- Name: files files_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3332 (class 2606 OID 16594)
-- Name: lessons lessons_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3333 (class 2606 OID 16610)
-- Name: user_favorites user_favorites_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3334 (class 2606 OID 16605)
-- Name: user_favorites user_favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3335 (class 2606 OID 16626)
-- Name: user_likes user_likes_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3336 (class 2606 OID 16621)
-- Name: user_likes user_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toby
--

ALTER TABLE ONLY public.user_likes
    ADD CONSTRAINT user_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-09-07 02:39:18 UTC

--
-- PostgreSQL database dump complete
--

