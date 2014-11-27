TileMap Generator
=====

Generates tiles from a large image (16384x8192px) according to Tile Map Service Specification


Prerequisites
-----

1. Install ImageMagick

    brew install ImageMagick

2. Install dependencies

    npm install
    
3. Download source image and put it to `in` folder

Image example: http://eoimages.gsfc.nasa.gov/images/imagerecords/55000/55167/land_lights_16384.tif
(From: http://visibleearth.nasa.gov/view.php?id=55167)


Running
-----

1. This will generate 2048x2048 tiles into `out/2048`

    npm start in/land_lights_16384.tif 2048
  
2. This will generate 256x256, 515x512 and 1024x1024 tiles into corresponding sub-folders of `out`

    npm start in/land_lights_16384.tif 256,512,1024
  
Usage
-----

To be able to use tiles, you have to generate `tilemapresource.xml` in each subfolder

    out/512/tilemapresource.xml

At the moment, automatic `tilemapresource.xml` generator is yet to be done
 
Refer to http://wiki.osgeo.org/wiki/Tile_Map_Service_Specification for specs

Example for 256x256 tiles:

    <?xml version="1.0" encoding="utf-8"?>
    <TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0">
      <Title>land_lights_16384.tif</Title>
      <Abstract></Abstract>
      <SRS>EPSG:4326</SRS>
      <BoundingBox minx="-90.00000000000000" miny="-180.00000000000000" maxx="90.00000000000000"
                   maxy="180.00000000000000"/>
      <Origin x="-90.00000000000000" y="-180.00000000000000"/>
      <TileFormat width="256" height="256" mime-type="image/jpg" extension="jpg"/>
      <TileSets profile="geodetic">
        <TileSet href="0" units-per-pixel="0.70312500000000" order="0"/>
        <TileSet href="1" units-per-pixel="0.35156250000000" order="1"/>
        <TileSet href="2" units-per-pixel="0.17578125000000" order="2"/>
        <TileSet href="3" units-per-pixel="0.08789062500000" order="3"/>
        <TileSet href="4" units-per-pixel="0.04394531250000" order="4"/>
        <TileSet href="5" units-per-pixel="0.02197265625000" order="5"/>
      </TileSets>
    </TileMap>

Example for 512x512 tiles:

    <?xml version="1.0" encoding="utf-8"?>
    <TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0">
      <Title>land_lights_16384.tif</Title>
      <Abstract></Abstract>
      <SRS>EPSG:4326</SRS>
      <BoundingBox minx="-90.00000000000000" miny="-180.00000000000000" maxx="90.00000000000000"
                   maxy="180.00000000000000"/>
      <Origin x="-90.00000000000000" y="-180.00000000000000"/>
      <TileFormat width="512" height="512" mime-type="image/jpg" extension="jpg"/>
      <TileSets profile="geodetic">
        <TileSet href="0" units-per-pixel="0.35156250000000" order="0"/>
        <TileSet href="1" units-per-pixel="0.17578125000000" order="1"/>
        <TileSet href="2" units-per-pixel="0.08789062500000" order="2"/>
        <TileSet href="3" units-per-pixel="0.04394531250000" order="3"/>
        <TileSet href="4" units-per-pixel="0.02197265625000" order="4"/>
      </TileSets>
    </TileMap>

Example for 1024x1024 tiles:

    <?xml version="1.0" encoding="utf-8"?>
    <TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0">
      <Title>land_lights_16384.tif</Title>
      <Abstract></Abstract>
      <SRS>EPSG:4326</SRS>
      <BoundingBox minx="-90.00000000000000" miny="-180.00000000000000" maxx="90.00000000000000"
                   maxy="180.00000000000000"/>
      <Origin x="-90.00000000000000" y="-180.00000000000000"/>
      <TileFormat width="1024" height="1024" mime-type="image/jpg" extension="jpg"/>
      <TileSets profile="geodetic">
        <TileSet href="0" units-per-pixel="0.17578125000000" order="0"/>
        <TileSet href="1" units-per-pixel="0.08789062500000" order="1"/>
        <TileSet href="2" units-per-pixel="0.04394531250000" order="2"/>
        <TileSet href="3" units-per-pixel="0.02197265625000" order="3"/>
      </TileSets>
    </TileMap>
        
Example for 2048x2048 tiles:

    <?xml version="1.0" encoding="utf-8"?>
    <TileMap version="1.0.0" tilemapservice="http://tms.osgeo.org/1.0.0">
      <Title>land_lights_16384.tif</Title>
      <Abstract></Abstract>
      <SRS>EPSG:4326</SRS>
      <BoundingBox minx="-90.00000000000000" miny="-180.00000000000000" maxx="90.00000000000000"
                   maxy="180.00000000000000"/>
      <Origin x="-90.00000000000000" y="-180.00000000000000"/>
      <TileFormat width="2048" height="2048" mime-type="image/jpg" extension="jpg"/>
      <TileSets profile="geodetic">
        <TileSet href="0" units-per-pixel="0.08789062500000" order="0"/>
        <TileSet href="1" units-per-pixel="0.04394531250000" order="1"/>
        <TileSet href="2" units-per-pixel="0.02197265625000" order="2"/>
      </TileSets>
    </TileMap>
    

CesiumJS initialization

    var widget = new Cesium.CesiumWidget('cesium', {
      clock: new Cesium.Clock({
        shouldAnimate: false
      }),
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: '/assets/cesium/512',
        credit: 'Data courtesy Marc Imhoff of NASA GSFC and Christopher Elvidge of NOAA NGDC.' +
          ' Image by Craig Mayhew and Robert Simmon, NASA GSFC.'
      }),
      terrainProvider: new Cesium.EllipsoidTerrainProvider()
    });
