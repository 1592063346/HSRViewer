# HSRViewer

## How to deploy and run on Linux?

First, clone this repository.

```bash
git clone https://github.com/1592063346/HSRViewer.git
```

Then, install Node.js, yarn and TypeScript. You can update the version of node.js downloaded in the following commands as needed, where the default is v18.14.2. The official site is https://nodejs.org/en.

```bash
mkdir ~/workspace && cd ~/workspace
wget https://nodejs.org/dist/v18.14.2/node-v18.14.2-linux-x64.tar.xz
tar -xf node-v18.14.2-linux-x64.tar.xz
cd node-v18.14.2-linux-x64/bin
export PATH=~/workspace/node-v18.14.2-linux-x64/bin:$PATH
source ~/.bashrc
npm install -g yarn
yarn global add typescript
cd ../..
```

Finally, install dependencies, build and run successfully.

```bash
cd ~/HSRViewer
yarn install
yarn build
yarn start
```