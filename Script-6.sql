create table expenses(
	id INT generated always as identity primary key,
	name character varying(200) not null, 
	category integer references categories(id),
	transaction_date date not null default current_date,
	amount real not null
);

create table categories(
	id integer primary key, 
	category character varying(50)
);

alter table categories(
	id INT generated always as identity primary key,
	product_name character varying(50)
)

drop table categories

delete from categories

insert into categories (name) VALUES('трансо')

select pg_get_serial_sequence('categories', 'id')

alter sequence public.categories_id_seq restart with 1

select pg_get_serial_sequence('expenses', 'id')

alter sequence public.expenses_id_seq restart with 1


with category_id as ( select id from categories where name='транспорт') insert into expenses (name, category, transaction_date, amount) SELECT 'Цветы', id,'2025-04-25', 5451.1 from category_id
	
	
with category_id as (
	select id from categories where name='транспорт'
)
select * from category_id 

delete from expenses

select sum(amount) from expenses group by name