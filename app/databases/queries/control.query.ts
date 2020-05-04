
export const CONTROL_QUERY = {

  GET_ALL_USERS: `SELECT * FROM tp_usuarios WHERE tiem_elimin ISNULL`,
  GET_ALL_POLYGOS_BY_NIVEL: `SELECT pol.id ,
                           pol.nombre ,
                           pol.nivel ,
                           pol.rgb ,
                           pol.xcoorutf ,
                           pol.ycoorutf,
                           acm.actualmined,
                           (tp.tonelaje_inicial + tp.ton_calc) as total
          
                    FROM POLIGONOSINI as pol
                    LEFT OUTER JOIN nearestpolygons acm on pol.id2 = acm.id2polygon
                    LEFT OUTER JOIN ts_poligono tp on tp.id = pol.id
                    where pol.issplit = FALSE and pol.nivel = {{nivel}};`,
  GET_ALL_POLYGOS: `SELECT pol.id ,
                          pol.nombre ,
                          pol.nivel ,
                          pol.rgb ,
                          pol.xcoorutf ,
                          pol.ycoorutf,
                          acm.actualmined,
                          (tp.tonelaje_inicial + tp.ton_calc) as total

                        FROM POLIGONOSINI as pol
                        LEFT OUTER JOIN nearestpolygons acm on pol.id2 = acm.id2polygon
                        LEFT OUTER JOIN ts_poligono tp on tp.id = pol.id

                        where pol.issplit = FALSE`,

  GET_LAST_POSITIONS_EQUIPMENT: `
  select
  nombre,
  tse.id_equipo,
  case
    when id_flota=25 then 0
    when id_flota=24 then 1
    when id_flota between 21 and 22 then 2
    when id_flota=26 then 3
   end as icono,
  ancho,
  largo,
  tscd.valor as width,
  tscd.valor as height,
  tspe.latitudint::numeric/1000000 as latitud,
  tspe.longitudint::numeric/1000000 as longitud,
  tspe.precisiongps,
  tspe.direccionint
  from ts_equipos tse
  left join ta_posicionequipos tspe on tse.id_equipo=tspe.id_equipo
  left join ts_configuracion_equipo_detalle tscd on tse.id_equipo=tscd.id_equipo and tscd.id_configuracion_equipo=112
  left join ts_configuracion_equipo_detalle tscd2 on tse.id_equipo=tscd2.id_equipo and tscd2.id_configuracion_equipo=113
  where
  tse.id_flota in (21,22,24,25,26) and tse.tiem_elimin is null
  and ipequipo<>'0.0.0.0'
  and ipequipo<>''
  and ipequipo is not null
  order by 1;
    `,

    GET_ZONES:`select * from zonas;`,
    GET_DIGLINE_GLOBAL : `SELECT * from datadiglineglobal`,

    GET_CURRENT_MESH:`
    select
       mal.id_malla,
       mal.nombre as nombre_malla,
       mal.nivel,
       tpe.id_taladro id_taladro_actual,
       tal.nombre hole_actual,
       tpe.id_perforacion id_perforacion_actua,
       tpe.target_profundidad,
       tpe.profundidad,
       tpt.apellidop,
       tpt.apellidom,
       tpt.nombre,
       (select ac.nombre
      from tp_drill_cycle_tdrill cy
      left join ta_actividades_drill_tdrill ac on cy.id_actividad=ac.id_actividad
      where id_perforacion=tpe.id_perforacion order by tiempo_ini desc limit 1) as actividad_actual
      from tp_perforacion_tdrill tpe
      left join ta_taladro_tdrill tal on tpe.id_taladro=tal.id
      left join ta_malla_tdrill mal on tal.id_malla=mal.id_malla
      left join tp_trabajador tpt on tpe.id_operador=tpt.id_trabajador
      where tpe.id_equipo=62 order by tpe.tiempo_ini desc limit 1;
    `,

    GET_HOLES:`
    select tal.id_taladro,
       tpe.id_equipo,
       tse.nombre as equipo,
       tal.nombre as hole,
       tal.coor_x::numeric/100 as coor_x_tal,
       tal.coor_y::numeric/100 as  coor_y_tal,
       tal.target_profundidad as target,
       tal.subdrill,
       tal.tipo_taladro,
       tal.hole_estado,
       hoe.nombre as estado,
       tal.profundidad_actual,
       tpe.id_perforacion,
       tpe.x::numeric/100 as coor_x_hole,
       tpe.y::numeric/100 as coor_y_hole,
       tpe.z::numeric/100 as coor_z_hole,
       tpe.profundidad,
       tpe.target_profundidad,
       tpe.presencia_agua,
       tpe.is_redrill,
       tpe.is_extrahole,
       tpe.is_endhole,
       tpe.id_operador,
       tpt.apellidop,
       tpt.apellidom,
       tpt.nombre,
       tpe.tiempo_ini,
       gps.precisiongps[round((extract(epoch from tpe.tiempo_ini-gps.tiem_creac)/2)::numeric,0)] as precisiongps

from
    ta_taladro_tdrill tal
    left join ta_holeestado hoe on tal.hole_estado=hoe.id
    left join tp_perforacion_tdrill tpe on tal.id_taladro=tpe.id_taladro
    left join ts_equipos tse on tpe.id_equipo=tse.id_equipo
    left join tp_trabajador tpt on tpe.id_operador=tpt.id_trabajador
    left join (
        select precisiongps,tiem_creac,id_equipo from ta_data_auxiliares
          union all
        select precisiongps,tiem_creac,id_equipo from ta_data_auxiliares_historic
        ) as gps on gps.id_equipo=tpe.id_equipo and gps.tiem_creac=date_trunc('hour',tpe.tiempo_ini)


where tal.id_malla={{id_malla}} and tal.tiem_elimin is null and tpe.tiem_elimin is null;
    `,
    NEARBY_MESHES:`
    select 
    nombre,
    coor_x_min::numeric/100 as coor_x_min,
    coor_y_min::numeric/100 coor_y_min,
    coor_x_max::numeric/100 coor_x_max,
    coor_y_max::numeric/100 as coor_y_max 
    from ta_malla_tdrill where is_malla and nivel={{nivel}} and tiem_elimin is null;
    `,
    DEPTH_PRECISION:`
    SELECT
							avg(percent) as avgpercent from
							(
								SELECT
								 lj.profundidadreal   AS profundidadreal
								,lj.profundidadtarget AS profundidadtarget
								,(1 -
								(
									abs(lj.profundidadreal - lj.profundidadtarget)
									/
									lj.profundidadtarget
								))*100 as percent
								from ta_taladro_tdrill ttd
								left join tp_perforacion_tdrill tpt on tpt.id_taladro = ttd.id
								-- //==//==--=================
								left join ta_taladro_tdrill tatt ON tatt.id = tpt.id_taladro
								-- //==//==--=================
								--I:Banco
								left join ta_malla_tdrill tamt on tamt.id_malla = ttd.id_malla
								left join ta_malla_tdrill tamb on tamb.id_malla = tamt.id_banco
								--F:Banco
								left join lateral (
									select
									 (round(
										case when tpt.profundidad is null or tpt.profundidad = 0 then
											round((tatt.target_profundidad - ((((tpt.z / 100.00) - tatt.nivel)) / 100)) / 100.0)
										else
											tpt.profundidad / 100.0
										end, 1))                               AS profundidadreal
									,(tpt.z / 100.00 - tamb.nombre::INTEGER + (ttd.subdrill / 100.00)) AS profundidadtarget
								) lj ON true
								where
									tpt.tiempo_fin >= {{ini}}
								and tpt.tiempo_fin  < {{end}}
                and tpt.id_equipo={{id_equipo}}
								and tpt.tiem_elimin is null
								and ttd.tiem_elimin is null
								and (tpt.x is not null and tpt.y is not null
							)
						) as tmp;
    `,
    POSITION_PRECISION:`
    SELECT
    CASE WHEN avg(percent) IS NULL THEN 0 ELSE avg(percent) END as avgpercent
    from
    (
      select
      CASE WHEN pr.percent < 0 THEN NULL ELSE pr.percent END AS percent
      from ta_taladro_tdrill ttd
      left join tp_perforacion_tdrill tpt on tpt.id_taladro = ttd.id
      left join lateral (
        select
         ttd.coor_x/100.00 AS xdiseno
        ,ttd.coor_y/100.00 AS ydiseno
        ,tpt.x/100.00 AS xperf
        ,tpt.y/100.00 AS yperf
      ) lt ON true
      left join lateral (
        select sqrt(
          power(lt.xdiseno - lt.xperf, 2)
          +
          power(lt.ydiseno - lt.yperf, 2)
         ) as distanciaaltarget
      ) lj ON true
      left join lateral (
        select (1 - (lj.distanciaaltarget / 2))*100 as percent
      ) pr on true
      where
        tpt.tiempo_fin >= {{ini}}
      and tpt.tiempo_fin  < {{end}}
      and tpt.tiem_elimin is null
      and ttd.tiem_elimin is null
      and tpt.id_equipo={{id_equipo}}
      and (tpt.x is not null and tpt.y is not null)
    ) as tmp;
    `,
    STATE_EQUIPMENT:`
    select est.h as id_estado,
       est.g as nombre_equipo,
       est.c as estado_principal,
       est.d as detalle_1,
       est.f as detalle_2
    from tp_estados tpe
    left join estados est on tpe.id_detal_estado=est.a and tpe.id_equipo=est.i
    where tpe.id_equipo={{id_equipo}}
    order by tpe.tiempo_inicio desc limit 1;
    `,
    PITCH_ROLL_AUXILIAR:`
    select
    incl_pitch[array_length(incl_pitch,1)] pitch,
    incl_roll[array_length(incl_roll,1)] roll
    from ta_data_auxiliares
    where id_equipo={{id_equipo}}
    order by tiem_creac desc limit 1;
    `,

}

